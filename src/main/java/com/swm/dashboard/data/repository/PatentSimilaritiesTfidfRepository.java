package com.swm.dashboard.data.repository;

import com.swm.dashboard.data.entity.PatentSimilaritiesTfidf;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PatentSimilaritiesTfidfRepository extends CrudRepository<PatentSimilaritiesTfidf, String> {

    // query to get keyword ground-truth corresponding to a patent
    @Query(value = "select * from patent_similarities_tfidf where patent_id = :patentId", nativeQuery = true)
    public PatentSimilaritiesTfidf findPatentSimilaritiesTfidfByPatentId(@Param("patentId") String patentId);
}
