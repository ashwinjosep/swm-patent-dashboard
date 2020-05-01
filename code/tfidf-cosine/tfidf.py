from sklearn.feature_extraction.text import TfidfVectorizer

def compute_tfidf(documents):
    tfidf_vec = TfidfVectorizer().fit_transform(documents)
    return tfidf_vec
