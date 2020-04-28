package com.swm.dashboard.web;

import com.swm.dashboard.data.entity.PatentCitations;
import com.swm.dashboard.data.entity.PatentKeywords;
import com.swm.dashboard.data.repository.PatentCitationsRepository;
import com.swm.dashboard.service.StringUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class PatentCitationsWebController {

    PatentCitationsRepository patentCitationsRepository;

    @Autowired
    public PatentCitationsWebController(PatentCitationsRepository patentCitationsRepository) {
        this.patentCitationsRepository = patentCitationsRepository;
    }

    //get all citations corresponding to a patent id
    @CrossOrigin
    @GetMapping("api/patent_citations/")
    public PatentCitations getAllPatentCitationsByPatentId(@RequestParam(name = "patent_id", required = true)String patentId) {
        String patent = StringUtilsService.getFormattedString(patentId);
        PatentCitations patentCitations = this.patentCitationsRepository.findPatentCitationsByPatentId(patent);
        return patentCitations;
    }

    //get all patent citations
    @CrossOrigin
    @GetMapping("api/patent_citations")
    public List<PatentCitations> getAllPatentCitations(Model model) {
        Iterable<PatentCitations> patentCitations = this.patentCitationsRepository.findAll();
        List<PatentCitations> resultPatentCitationsList = new ArrayList<>();

        //for testing
        int count = 0;
        for (PatentCitations patentCitation : patentCitations) {
            resultPatentCitationsList.add(patentCitation);
            count++;
            if(count==20)
                break;
        }
        model.addAttribute("patentCitationsList", resultPatentCitationsList);
        return resultPatentCitationsList;
    }

    //get all patent keyword combinations within a specific range of row numbers ordered by citation count
    @CrossOrigin
    @GetMapping("api/patent_citations_range/")
    public List<PatentCitations> getAllPatentCitationsWithinRange(@RequestParam Map<String, String> params) {
        int start = Integer.parseInt(params.get("start"));
        int limit = Integer.parseInt(params.get("limit"));
        Iterable<PatentCitations> patentCitations = this.patentCitationsRepository.findAllWithinRange(start, limit);
        List<PatentCitations> resultPatentCitationsList = new ArrayList<>();

        for (PatentCitations patentCitation : patentCitations) {
            resultPatentCitationsList.add(patentCitation);
        }
        return resultPatentCitationsList;
    }

}
