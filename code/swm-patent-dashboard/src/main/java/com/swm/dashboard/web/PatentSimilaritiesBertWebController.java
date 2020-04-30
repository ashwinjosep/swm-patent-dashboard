package com.swm.dashboard.web;

import com.swm.dashboard.data.entity.PatentSimilaritiesBert;
import com.swm.dashboard.data.repository.PatentSimilaritiesBertRepository;
import com.swm.dashboard.service.StringUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PatentSimilaritiesBertWebController {

    PatentSimilaritiesBertRepository patentSimilaritiesBertRepository;

    @Autowired
    public PatentSimilaritiesBertWebController(PatentSimilaritiesBertRepository patentSimilaritiesBertRepository) {
        this.patentSimilaritiesBertRepository = patentSimilaritiesBertRepository;
    }

    //get similar documents based on vector embeddings for a given patent
    @CrossOrigin
    @GetMapping("api/patent_similarities_bert/")
    public PatentSimilaritiesBert getPatentSimilarBertPatents(@RequestParam(name = "patent_id", required = true) String patentId) {
        //to-do add patent id validation from main table
        String patent = StringUtilsService.getFormattedString(patentId);
        PatentSimilaritiesBert patentSimilaritiesBert = this.patentSimilaritiesBertRepository.findPatentSimilaritiesBertByPatentId(patent);
        return patentSimilaritiesBert;
    }
}
