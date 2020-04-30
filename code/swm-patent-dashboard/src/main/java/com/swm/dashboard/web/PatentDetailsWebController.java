package com.swm.dashboard.web;

import com.swm.dashboard.data.entity.PatentDetails;
import com.swm.dashboard.data.entity.PatentYearCount;
import com.swm.dashboard.data.repository.PatentDetailsRepository;
import com.swm.dashboard.service.StringUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigInteger;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
public class PatentDetailsWebController {

    PatentDetailsRepository patentDetailsRepository;

    @Autowired
    public PatentDetailsWebController(PatentDetailsRepository patentDetailsRepository) {
        this.patentDetailsRepository = patentDetailsRepository;
    }

    //get all citations corresponding to a patent id
    @CrossOrigin
    @GetMapping("api/patent_details/")
    public PatentDetails getAllPatentDetailsByPatentId(@RequestParam(name = "patent_id", required = true)String patentId) {
        String patent = StringUtilsService.getFormattedString(patentId);
        PatentDetails patentDetails = this.patentDetailsRepository.findPatentDetailsByPatentId(patent);
        return patentDetails;
    }

    //get all patent details
    @CrossOrigin
    @GetMapping("api/all_patent_details")
    public List<PatentDetails> getAllPatentDetails() {
        Iterable<PatentDetails> patentDetailsIterable = this.patentDetailsRepository.findAll();
        List<PatentDetails> patentDetailsList = new ArrayList<>();
        for (PatentDetails patentDetails : patentDetailsIterable) {
            patentDetailsList.add(patentDetails);
        }
        return patentDetailsList;
    }

    //get patent counts by year
    @CrossOrigin
    @GetMapping("api/yearwise_patent_details")
    public List<PatentYearCount> getYearwisePatentCount() {
        List<PatentYearCount> patentYearCountList = new ArrayList<>();
        List<Object[]> patentYearwiseCountObjects = this.patentDetailsRepository.findPatentYearwiseCount();
        for(int i=0;i<patentYearwiseCountObjects.size();i++) {
            Object[] patentYearwiseCountObject = patentYearwiseCountObjects.get(i);
            BigInteger count = (BigInteger) patentYearwiseCountObject[1];
            Date date = (Date) patentYearwiseCountObject[0];
            PatentYearCount patentYearCount = new PatentYearCount(date.toLocalDate().getYear(), count);
            patentYearCountList.add(patentYearCount);
        }
        return patentYearCountList;
    }

    //get patent details sorted by year
    @CrossOrigin
    @GetMapping("api/yearwise_sorted_patent_details")
    public List<PatentDetails> getYearwiseSortedPatentDetails() {
        List<PatentDetails> patentDetailsList = new ArrayList<>();
        Iterable<PatentDetails> patentDetailsIterable = this.patentDetailsRepository.findYearwisePatentDetails();
        patentDetailsIterable.forEach(patentDetailsList::add);
        return patentDetailsList;
    }
}
