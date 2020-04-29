package com.swm.dashboard.data.repository;

import com.swm.dashboard.data.entity.PatentSimilaritiesBert;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface  PatentSimilaritiesBertRepository extends CrudRepository<PatentSimilaritiesBert, String> {

    // query to get similar documents corresponding to a patent
    @Query(value = "select * from patent_similarities_bert where patent_id = :patentId", nativeQuery = true)
    public PatentSimilaritiesBert findPatentSimilaritiesBertByPatentId(@Param("patentId") String patentId);

}
