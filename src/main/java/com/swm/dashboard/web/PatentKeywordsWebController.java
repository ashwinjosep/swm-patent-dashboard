package com.swm.dashboard.web;


import com.swm.dashboard.data.entity.PatentKeywords;
import com.swm.dashboard.data.repository.PatentKeywordsRepository;
import com.swm.dashboard.service.StringUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PatentKeywordsWebController {

    @Autowired
    PatentKeywordsRepository patentKeywordsRepository;

    //get all keywords corresponding to a patent
    @GetMapping("api/patent_keywords/")
    public List<PatentKeywords> getAllPatentKeywordsByPatentId(@RequestParam(name = "patent_id", required = true) String patentId) {
        //to-do add patent id validation from main table
        String patent = StringUtilsService.getFormattedString(patentId);
        return this.patentKeywordsRepository.findPatentKeywordsByPatentId(patent);
    }

    //get all patent keyword combinations
    @GetMapping("api/patent_keywords")
    public List<PatentKeywords> getAllPatentKeywords() {
        Iterable<PatentKeywords> patentKeywords = this.patentKeywordsRepository.findAll();
        List<PatentKeywords> resultPatentKeywordsList = new ArrayList<>();
        patentKeywords.forEach(resultPatentKeywordsList::add);
        return resultPatentKeywordsList;
    }
}
