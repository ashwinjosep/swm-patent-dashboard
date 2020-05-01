# query patent number
# list of patent number of cited documents

import glob, os
import tfidf, cossim

def find_similar_patents(patent, citations, k):
    citation_doc_name = []
    citation_document = []
    patent_found = False
    # Path to patent text
    path_name = "D:/ASU_Courses/SWM/project/patent_text/"
    for file in glob.glob(os.path.normpath(path_name + "*.txt")):
        file_name = os.path.basename(file).split('.')[0]
        if file_name == patent:
            patent_found = True
        if file_name in citations:
            citation_doc_name.append(file_name)
            text = open(file, encoding = 'utf-8').read()
            citation_document.append(text)
    if not patent_found:
        print("Patent Text not available")
        return [], []
    else:

        patent_text = open(path_name + patent + ".txt", encoding = 'utf-8').read()
        citation_document.insert(0, patent_text)
        citation_doc_name.insert(0, patent)
        tfidf_vec = tfidf.compute_tfidf(citation_document)
        #print(tfidf_vec.shape)
        similarity_indices, similarity_values = cossim.compute(tfidf_vec[0], tfidf_vec, k)
        patent_names_similar = [citation_doc_name[index] for index in similarity_indices]
        return patent_names_similar, similarity_values
