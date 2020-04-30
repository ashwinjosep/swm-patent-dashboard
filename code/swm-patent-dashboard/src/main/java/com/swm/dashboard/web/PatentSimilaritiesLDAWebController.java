package com.swm.dashboard.web;

import com.swm.dashboard.data.entity.PatentSimilaritiesLDA;
import com.swm.dashboard.data.repository.PatentSimilaritiesLDARepository;
import com.swm.dashboard.service.StringUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PatentSimilaritiesLDAWebController {

    PatentSimilaritiesLDARepository patentSimilaritiesLDARepository;

    @Autowired
    public PatentSimilaritiesLDAWebController(PatentSimilaritiesLDARepository patentSimilaritiesLDARepository) {
        this.patentSimilaritiesLDARepository = patentSimilaritiesLDARepository;
    }

    //get similar documents based on lda for a given patent
    @CrossOrigin
    @GetMapping("api/patent_similarities_lda/")
    public PatentSimilaritiesLDA getPatentSimilarLDAPatents(@RequestParam(name = "patent_id", required = true) String patentId) {
        //to-do add patent id validation from main table
        String patent = StringUtilsService.getFormattedString(patentId);
        PatentSimilaritiesLDA patentSimilaritiesLDA = this.patentSimilaritiesLDARepository.findPatentSimilaritiesLDAByPatentId(patent);
        return patentSimilaritiesLDA;
    }
}
