from sklearn.metrics.pairwise import linear_kernel
import numpy as np
def compute(patent, citations, k):
    cosine_similarities = linear_kernel(patent, citations).flatten()
    similarity_values = np.sort(cosine_similarities)
    omitted_similarity_values = []
    omitted_similarity_indices = []
    final_similarity_values = []
    final_similarity_indices = []
    # print(similarity_values.shape[0])
    related_docs_indices = cosine_similarities.argsort()
    for i in range(similarity_values.shape[0]-1, 0, -1):
        if similarity_values[i] > 0.98:
            omitted_similarity_values.append(similarity_values[i])
            omitted_similarity_indices.append(related_docs_indices[i])
        else:
            final_similarity_values.append(similarity_values[i])
            final_similarity_indices.append(related_docs_indices[i])
    # print(omitted_similarity_values)
    # print(omitted_similarity_indices)
    final_similarity_values = final_similarity_values[0:k+1]
    final_similarity_indices = final_similarity_indices[0:k+1]
    return final_similarity_indices, final_similarity_values
