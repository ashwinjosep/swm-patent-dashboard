package com.swm.dashboard.web;

import com.swm.dashboard.data.entity.TopicData;
import com.swm.dashboard.data.repository.TopicDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TopicDataWebController {

    TopicDataRepository topicDataRepository;

    @Autowired
    public TopicDataWebController(TopicDataRepository topicDataRepository) {
        this.topicDataRepository = topicDataRepository;
    }

    @CrossOrigin
    @GetMapping("/api/get_topic_data")
    public List<TopicData> getTopicData() {
        Iterable<TopicData> topicDataIterable = this.topicDataRepository.findAll();
        List<TopicData> topicDataList = new ArrayList<>();
        topicDataIterable.forEach(topicDataList::add);
        return topicDataList;
    }
}
