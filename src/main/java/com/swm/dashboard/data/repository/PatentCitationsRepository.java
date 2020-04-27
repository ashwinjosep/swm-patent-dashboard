package com.swm.dashboard.data.repository;

import com.swm.dashboard.data.entity.PatentCitations;
import com.swm.dashboard.data.entity.PatentKeywords;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PatentCitationsRepository extends CrudRepository<PatentCitations, String> {

    // query to get keyword ground-truth corresponding to a patent
    @Query(value = "select * from patent_citations where patent_id = :patentId", nativeQuery = true)
    public PatentCitations findPatentCitationsByPatentId(@Param("patentId") String patentId);
}
