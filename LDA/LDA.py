import os
import re
import time
import nltk
import numpy as np
import pandas as pd
import seaborn as sns
from gensim import corpora
from gensim.models import LdaModel
from nltk import FreqDist
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from scipy.stats import entropy

sns.set_style("darkgrid")

''' 
Run this command before processing
nltk.download('punkt')
'''

'''
Constants
'''
NUMBER_OF_SIMILAR_DOCS = 15
NUMBER_OF_TOPICS = 10
OUTPUT_PATH_DIR = 'results/'

'''
Variables
'''
stop_words = stopwords.words('english')
stemmer = PorterStemmer()


def initial_clean(text):
    """
    Function to clean text of websites, email addresses and any punctuation
    We also lower case the text
    """
    text = re.sub("((\S+)?(http(s)?)(\S+))|((\S+)?(www)(\S+))|((\S+)?(\@)(\S+)?)", " ", text)
    text = re.sub("[^a-zA-Z ]", "", text)
    text = text.lower()  # lower case the text
    text = nltk.word_tokenize(text)
    return text


def remove_stop_words(text):
    """
    Function that removes all stopwords from text
    """
    return [word for word in text if word not in stop_words]


def stem_words(text):
    """
    Function to stem words, so plural and singular are treated the same
    """
    try:
        text = [stemmer.stem(word) for word in text]
        text = [word for word in text if len(word) > 1]  # make sure we have no 1 letter words
    except IndexError:  # the word "oed" broke this, so needed try except
        pass
    return text


def apply_all(text):
    """
    This function applies all the functions above into one
    """
    return stem_words(remove_stop_words(initial_clean(text)))


def train_lda(data):
    """
    This function trains the lda model
    We setup parameters like number of topics, the chunksize to use in Hoffman method
    We also do 2 passes of the data since this is a small dataset, so we want the distributions to stabilize
    """
    chunksize = 300
    dictionary = corpora.Dictionary(data['tokenized'])
    corpus = [dictionary.doc2bow(doc) for doc in data['tokenized']]
    t1 = time.time()
    # low alpha means each document is only represented by a small number of topics, and vice versa
    # low eta means each topic is only represented by a small number of words, and vice versa
    lda = LdaModel(corpus=corpus, num_topics=NUMBER_OF_TOPICS, id2word=dictionary,
                   alpha=1e-2, eta=0.5e-2, chunksize=chunksize, minimum_probability=0.0, passes=3)
    t2 = time.time()
    print("Time to train LDA model on ", len(data), "articles: ", (t2 - t1) / 60, "min")
    return dictionary, corpus, lda


def jensen_shannon(query, matrix):
    """
    This function implements a Jensen-Shannon similarity
    between the input query (an LDA topic distribution for a document)
    and the entire corpus of topic distributions.
    It returns an array of length M where M is the number of documents in the corpus
    """
    # lets keep with the p,q notation above
    p = query[None, :].T  # take transpose
    q = matrix.T  # transpose matrix
    print(p.shape)
    print(q.shape)
    m = 0.5 * (p + q)
    return np.sqrt(0.5 * (entropy(p, m) + entropy(q, m)))


def get_most_similar_documents(query, matrix, k=NUMBER_OF_SIMILAR_DOCS):
    """
    This function implements the Jensen-Shannon distance above
    and retruns the top k indices of the smallest jensen shannon distances
    """
    sims = jensen_shannon(query, matrix)  # list of jensen shannon distances
    return np.partition(sims, -k)[-k:], sims.argsort()[
                                        :k]  # the top k positional index of the smallest Jensen Shannon distances


def compute_similarity(new_doc_distribution, doc_topic_dist, train_df):
    similarity_values, most_sim_ids = get_most_similar_documents(new_doc_distribution, doc_topic_dist)
    print(similarity_values, similarity_values.shape)
    print(most_sim_ids, most_sim_ids.shape)
    most_similar_df = train_df[train_df.index.isin(most_sim_ids)]['patent']
    patient_df = most_similar_df.to_numpy(dtype=str)
    sim_values = np.vstack((patient_df, similarity_values)).T.tolist()
    return [item for sublist in sim_values for item in sublist]


def main():
    # Here we have to read the patent_dict_1000.csv file and take all the patents from this file including the citing
    # and cited patents and take only those patents from the full_text.csv DataFraom and perform LDA on the same.
    # Once we do the LDA, we have to compare the patent with only the patents which is citing this patent mentioned in
    # the patent_dict_1000.csv file and return the top 15 results
    print("==> Reading data frame")
    df = pd.read_csv('data/full_text_1000.csv', usecols=['text', 'patent'])
    df = df[df['text'].map(type) == str]
    df.dropna(axis=0, inplace=True, subset=['text'])
    # shuffle the data
    df = df.sample(frac=1.0)
    df.reset_index(drop=True, inplace=True)
    # print(df.shape)
    # print(df.head())

    print("==> Cleaning and tokenizing")
    t1 = time.time()
    df['tokenized'] = df['text'].apply(apply_all)
    t2 = time.time()
    print("Time to clean and tokenize", len(df), "articles:", (t2 - t1) / 60, "min")

    print("==> Building corpus")
    # first get a list of all words
    all_words = [word for item in list(df['tokenized']) for word in item]
    # use nltk fdist to get a frequency distribution of all words
    fdist = FreqDist(all_words)
    # print(len(fdist))  # number of unique words

    # choose k and visually inspect the bottom 10 words of the top k
    k = 15000

    # define a function only to keep words in the top k words
    top_k_words, _ = zip(*fdist.most_common(k))
    top_k_words = set(top_k_words)

    def keep_top_k_words(text):
        return [word for word in text if word in top_k_words]

    df['tokenized'] = df['tokenized'].apply(keep_top_k_words)

    # document length
    df['doc_len'] = df['tokenized'].apply(lambda m: len(m))
    doc_lengths = list(df['doc_len'])
    df.drop(labels='doc_len', axis=1, inplace=True)

    print("length of list:", len(doc_lengths),
          "Document Length - avg:", np.average(doc_lengths),
          ", min:", min(doc_lengths),
          ", max:", max(doc_lengths))

    '''
    # plot - histogram of document length
    # num_bins = 1000
    # fig, ax = plt.subplots(figsize=(12,6));
    # # the histogram of the data
    # n, bins, patches = ax.hist(doc_lengths, num_bins, normed=1)
    # ax.set_xlabel('Document Length (tokens)', fontsize=15)
    # ax.set_ylabel('Normed Frequency', fontsize=15)
    # ax.grid()
    # ax.set_xticks(np.logspace(start=np.log10(50),stop=np.log10(2000),num=8, base=10.0))
    # plt.xlim(0,2000)
    # ax.plot([np.average(doc_lengths) for i in np.linspace(0.0,0.0035,100)], np.linspace(0.0,0.0035,100), '-',
    #         label='average doc length')
    # ax.legend()
    # ax.grid()
    # fig.tight_layout()
    # plt.show()
    '''

    '''
    # For Splitting into test and train dataset
    # create a mask of binary values
    # msk = np.random.rand(len(df)) < 0.98
    # train_df = df[msk]
    # train_df.reset_index(drop=True, inplace=True)
    #
    # test_df = df[~msk]
    # test_df.reset_index(drop=True, inplace=True)
    # print(len(df), len(train_df), len(test_df))
    '''

    # Here we are taking the entire dataset as the train set
    train_df = df
    train_df.reset_index(drop=True, inplace=True)

    print("==> Performing LDA")
    t3 = time.time()
    dictionary, corpus, lda = train_lda(train_df)
    t4 = time.time()
    print("Time to perfrom LDA:", (t3 - t4) / 60, "min")

    '''
    ## Check the result of LDA by selecting a random document
    ## lda.show_topic(topicid=4, topn=20)
    # select and article at random from train_df
    random_article_index = np.random.randint(len(train_df))
    bow = dictionary.doc2bow(train_df.iloc[random_article_index, 2])
    print(random_article_index)
    ## print(train_df.iloc[random_article_index,1])
    doc_distribution = np.array([tup[1] for tup in lda.get_document_topics(bow=bow)])
    
    # for i in doc_distribution.argsort()[-5:][::-1]:
    #     print(i, lda.show_topic(topicid=i, topn=10), "\n")

    '''

    '''
    ## bar plot of topic distribution for this document
    # fig, ax = plt.subplots(figsize=(12,6));
    # # the histogram of the data
    # patches = ax.bar(np.arange(len(doc_distribution)), doc_distribution)
    # ax.set_xlabel('Topic ID', fontsize=15)
    # ax.set_ylabel('Topic Contribution', fontsize=15)
    # ax.set_title("Topic Distribution for Article " + str(random_article_index), fontsize=20)
    # ax.set_xticks(np.linspace(10,10,10))
    # fig.tight_layout()
    # plt.show()
    '''

    '''
    # Project an unseen document to the existing space 
    # select and article at random from test_df
    # random_article_index = np.random.randint(len(test_df))
    # print(random_article_index)
    # new_bow = dictionary.doc2bow(train_df.iloc[377, 2])
    # print(train_df.iloc[random_article_index, 2])
    # new_doc_distribution = np.array([tup[1] for tup in lda.get_document_topics(bow=new_bow)])
    '''

    '''
    # # bar plot of topic distribution for this new document
    # fig, ax = plt.subplots(figsize=(12,6));
    # # the histogram of the data
    # patches = ax.bar(np.arange(len(new_doc_distribution)), new_doc_distribution)
    # ax.set_xlabel('Topic ID', fontsize=15)
    # ax.set_ylabel('Topic Contribution', fontsize=15)
    # ax.set_title("Topic Distribution for an Unseen Article", fontsize=20)
    # ax.set_xticks(np.linspace(10,10,10))
    # fig.tight_layout()
    # plt.show()
    '''

    # Constructing LDA topic distribution matrix from the LDA result
    doc_topic_dist = np.array([[tup[1] for tup in lst] for lst in lda[corpus]])
    t5 = time.time()

    print("==> Finding Document Similarities")
    output_path = os.path.join(OUTPUT_PATH_DIR, "lda_similarities.csv")
    with open(output_path, 'w') as fo:
        for i, (x) in enumerate(zip(doc_topic_dist)):
            similarity = compute_similarity(x[0], doc_topic_dist, train_df)
            # print("##### Computed similarity for :", i)
            # print(similarity)
            fo.write(str(train_df.iloc[i]['patent']) + "," + str(similarity).strip('[]') + '\n')

    t6 = time.time()
    print("Time to calculate similarities and save in CSV:", (t5 - t6) / 60, "min")

    print('predictions stored in file - {}'.format(output_path))


main()
