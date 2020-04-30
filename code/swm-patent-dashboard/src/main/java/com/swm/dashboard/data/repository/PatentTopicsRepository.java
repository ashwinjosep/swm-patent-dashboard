package com.swm.dashboard.data.repository;

import com.swm.dashboard.data.entity.PatentTopics;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatentTopicsRepository extends CrudRepository<PatentTopics, String> {

    // query to get patent topics corresponding to a patent
    @Query(value = "select * from patent_topics where patent_id = :patentId", nativeQuery = true)
    public PatentTopics findPatentTopicsById(@Param("patentId") String patentId);

    // query to get yearwise average patent topics
    @Query(value = "select year, avg(topic0) as topic0, avg(topic1) as topic1, avg(topic2) as topic2,"+
            " avg(topic3) as topic3, avg(topic4) as topic4, avg(topic5) as topic5, avg(topic6) as topic6, "+
            " avg(topic7) as topic7, avg(topic8) as topic8, avg(topic9) as topic9 from patent_topics"+
            " group by year order by year asc", nativeQuery = true)
    public List<Object[]> findYearwisePatentTopicsAverage();

}
