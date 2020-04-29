package com.swm.dashboard.data.repository;

import com.swm.dashboard.data.entity.PatentSimilaritiesEmbeddings;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PatentSimilaritiesEmbeddingsRepository extends CrudRepository<PatentSimilaritiesEmbeddings, String> {

    // query to get similar documents corresponding to a patent
    @Query(value = "select * from patent_similarities_embeddings where patent_id = :patentId", nativeQuery = true)
    public PatentSimilaritiesEmbeddings findPatentSimilaritiesEmbeddingsByPatentId(@Param("patentId") String patentId);
}
