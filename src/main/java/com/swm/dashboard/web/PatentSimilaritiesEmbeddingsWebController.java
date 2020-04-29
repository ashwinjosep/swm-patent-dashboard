package com.swm.dashboard.web;

import com.swm.dashboard.data.entity.PatentSimilaritiesEmbeddings;
import com.swm.dashboard.data.repository.PatentSimilaritiesEmbeddingsRepository;
import com.swm.dashboard.service.StringUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PatentSimilaritiesEmbeddingsWebController {

    PatentSimilaritiesEmbeddingsRepository patentSimilaritiesEmbeddingsRepository;

    @Autowired
    public PatentSimilaritiesEmbeddingsWebController(PatentSimilaritiesEmbeddingsRepository patentSimilaritiesEmbeddingsRepository) {
        this.patentSimilaritiesEmbeddingsRepository = patentSimilaritiesEmbeddingsRepository;
    }

    //get similar documents based on vector embeddings for a given patent
    @CrossOrigin
    @GetMapping("api/patent_similarities_embeddings/")
    public PatentSimilaritiesEmbeddings getPatentSimilarEmbeddingsPatents(@RequestParam(name = "patent_id", required = true) String patentId) {
        //to-do add patent id validation from main table
        String patent = StringUtilsService.getFormattedString(patentId);
        PatentSimilaritiesEmbeddings patentSimilaritiesEmbeddings = this.patentSimilaritiesEmbeddingsRepository.findPatentSimilaritiesEmbeddingsByPatentId(patent);
        return patentSimilaritiesEmbeddings;
    }
}
