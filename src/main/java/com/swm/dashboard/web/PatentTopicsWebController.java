package com.swm.dashboard.web;

import com.swm.dashboard.data.entity.PatentTopics;
import com.swm.dashboard.data.entity.PatentTopicsYearAverage;
import com.swm.dashboard.data.repository.PatentTopicsRepository;
import com.swm.dashboard.service.StringUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@RestController
public class PatentTopicsWebController {

    PatentTopicsRepository patentTopicsRepository;

    @Autowired
    public PatentTopicsWebController(PatentTopicsRepository patentTopicsRepository) {
        this.patentTopicsRepository = patentTopicsRepository;
    }

    @CrossOrigin
    @GetMapping("/api/patent_topics/")
    public PatentTopics getPatentTopicsById(@RequestParam(name = "patent_id", required = true) String patentId) {

        String patent = StringUtilsService.getFormattedString(patentId);
        PatentTopics patentTopics = this.patentTopicsRepository.findPatentTopicsById(patent);
        return patentTopics;
    }

    @CrossOrigin
    @GetMapping("/api/patent_topics")
    public List<PatentTopics> getPatentTopics() {
        List<PatentTopics> patentTopicsList = new ArrayList<>();
        Iterable<PatentTopics> patentTopicsIterable = this.patentTopicsRepository.findAll();
        patentTopicsIterable.forEach(patentTopicsList::add);
        return patentTopicsList;
    }

    @CrossOrigin
    @GetMapping("/api/patent_yearwise_topics")
    public List<PatentTopicsYearAverage> getPatentYearWiseTopics()
    {
        List<PatentTopicsYearAverage> patentTopicsYearAverageList = new ArrayList<>();
        List<Object[]> patentYearTopicsObjects = this.patentTopicsRepository.findYearwisePatentTopicsAverage();
        for (Object[] patentYearTopicsObject : patentYearTopicsObjects) {
            Date date = (Date) patentYearTopicsObject[0];
            BigDecimal topic0 = (BigDecimal) patentYearTopicsObject[1];
            BigDecimal topic1 = (BigDecimal) patentYearTopicsObject[2];
            BigDecimal topic2 = (BigDecimal) patentYearTopicsObject[3];
            BigDecimal topic3 = (BigDecimal) patentYearTopicsObject[4];
            BigDecimal topic4 = (BigDecimal) patentYearTopicsObject[5];
            BigDecimal topic5 = (BigDecimal) patentYearTopicsObject[6];
            BigDecimal topic6 = (BigDecimal) patentYearTopicsObject[7];
            BigDecimal topic7 = (BigDecimal) patentYearTopicsObject[8];
            BigDecimal topic8 = (BigDecimal) patentYearTopicsObject[9];
            BigDecimal topic9 = (BigDecimal) patentYearTopicsObject[10];
            PatentTopicsYearAverage patentTopicsYearAverage = new PatentTopicsYearAverage(date.toLocalDate().getYear(), topic0, topic1, topic2, topic3, topic4, topic5, topic6, topic7, topic8, topic9);
            patentTopicsYearAverageList.add(patentTopicsYearAverage);
        }
        return patentTopicsYearAverageList;
    }
}
