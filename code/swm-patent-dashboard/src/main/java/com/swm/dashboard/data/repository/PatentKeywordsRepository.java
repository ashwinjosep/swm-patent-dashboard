package com.swm.dashboard.data.repository;

import com.swm.dashboard.data.entity.PatentKeywords;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatentKeywordsRepository extends CrudRepository<PatentKeywords, String> {

    // query to get keyword ground-truth corresponding to a patent
    @Query(value = "select * from patent_keywords where patent_id = :patentId", nativeQuery = true)
    public PatentKeywords findPatentKeywordsByPatentId(@Param("patentId") String patentId);

}
