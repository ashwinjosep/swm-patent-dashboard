package com.swm.dashboard.data.repository;

import com.swm.dashboard.data.entity.PatentSimilaritiesLDA;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PatentSimilaritiesLDARepository extends CrudRepository<PatentSimilaritiesLDA, String > {

    // query to get keyword ground-truth corresponding to a patent
    @Query(value = "select * from patent_similarities_lda where patent_id = :patentId", nativeQuery = true)
    public PatentSimilaritiesLDA findPatentSimilaritiesLDAByPatentId(@Param("patentId") String patentId);
}
