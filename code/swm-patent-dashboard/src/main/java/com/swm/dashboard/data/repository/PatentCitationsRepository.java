package com.swm.dashboard.data.repository;

import com.swm.dashboard.data.entity.PatentCitations;
import com.swm.dashboard.data.entity.PatentKeywords;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatentCitationsRepository extends CrudRepository<PatentCitations, String> {

    // query to get keyword ground-truth corresponding to a patent
    @Query(value = "select * from patent_citations where patent_id = :patentId", nativeQuery = true)
    public PatentCitations findPatentCitationsByPatentId(@Param("patentId") String patentId);

    // query to get patent citations within a specific range of indices ordered by citation count
    @Query(value = "select * from patent_citations order by citation_count desc limit :start, :limit", nativeQuery = true)
    public List<PatentCitations> findAllWithinRange(@Param("start") int start, @Param("limit") int limit);
}
