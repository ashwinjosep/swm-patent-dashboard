package com.swm.dashboard.data.repository;

import com.swm.dashboard.data.entity.PatentDetails;
import com.swm.dashboard.data.entity.PatentYearCount;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface PatentDetailsRepository extends CrudRepository<PatentDetails, String> {

    // query to get patent details corresponding to a patent
    @Query(value = "select * from patent_details where patent_id = :patentId", nativeQuery = true)
    public PatentDetails findPatentDetailsByPatentId(@Param("patentId") String patentId);

    // query to get aggregated year wise patent details
    @Query(value = "select year as Year, count(patent_id) as Count from patent_details group by year order by year asc", nativeQuery = true)
    public List<Object[]>findPatentYearwiseCount();

    // query to get sorted year wise patent data
    @Query(value = "select * from patent_details order by year asc;", nativeQuery = true)
    public Iterable<PatentDetails> findYearwisePatentDetails();

}
