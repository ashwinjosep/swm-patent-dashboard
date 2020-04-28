package com.swm.dashboard.web;

import com.swm.dashboard.data.entity.PatentSimilaritiesTfidf;
import com.swm.dashboard.data.repository.PatentSimilaritiesTfidfRepository;
import com.swm.dashboard.service.StringUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PatentSimilaritiesTfidfWebController {

    PatentSimilaritiesTfidfRepository patentSimilaritiesTfidfRepository;

    @Autowired
    public PatentSimilaritiesTfidfWebController(PatentSimilaritiesTfidfRepository patentSimilaritiesTfidfRepository) {
        this.patentSimilaritiesTfidfRepository = patentSimilaritiesTfidfRepository;
    }

    //get similar documents based on tfidf for a given patent
    @CrossOrigin
    @GetMapping("api/patent_similarities_tfidf/")
    public PatentSimilaritiesTfidf getPatentSimilarTfidfPatents(@RequestParam(name = "patent_id", required = true) String patentId) {
        //to-do add patent id validation from main table
        String patent = StringUtilsService.getFormattedString(patentId);
        PatentSimilaritiesTfidf patentSimilaritiesTfidf = this.patentSimilaritiesTfidfRepository.findPatentSimilaritiesTfidfByPatentId(patent);
        return patentSimilaritiesTfidf;
    }
}
