package com.swm.dashboard.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "patent_topics")
public class PatentTopics {

    @Id
    @Column(name = "patent_id")
    private String patentId;

    @Column(name = "year")
    private int year;

    @Column(name = "topic0")
    private float topic0;

    @Column(name = "topic1")
    private float topic1;

    @Column(name = "topic2")
    private float topic2;

    @Column(name = "topic3")
    private float topic3;

    @Column(name = "topic4")
    private float topic4;

    @Column(name = "topic5")
    private float topic5;

    @Column(name = "topic6")
    private float topic6;

    @Column(name = "topic7")
    private float topic7;

    @Column(name = "topic8")
    private float topic8;

    @Column(name = "topic9")
    private float topic9;

    public String getPatentId() {
        return patentId;
    }

    public void setPatentId(String patentId) {
        this.patentId = patentId;
    }

    public float getTopic0() {
        return topic0;
    }

    public void setTopic0(float topic0) {
        this.topic0 = topic0;
    }

    public float getTopic1() {
        return topic1;
    }

    public void setTopic1(float topic1) {
        this.topic1 = topic1;
    }

    public float getTopic2() {
        return topic2;
    }

    public void setTopic2(float topic2) {
        this.topic2 = topic2;
    }

    public float getTopic3() {
        return topic3;
    }

    public void setTopic3(float topic3) {
        this.topic3 = topic3;
    }

    public float getTopic4() {
        return topic4;
    }

    public void setTopic4(float topic4) {
        this.topic4 = topic4;
    }

    public float getTopic5() {
        return topic5;
    }

    public void setTopic5(float topic5) {
        this.topic5 = topic5;
    }

    public float getTopic6() {
        return topic6;
    }

    public void setTopic6(float topic6) {
        this.topic6 = topic6;
    }

    public float getTopic7() {
        return topic7;
    }

    public void setTopic7(float topic7) {
        this.topic7 = topic7;
    }

    public float getTopic8() {
        return topic8;
    }

    public void setTopic8(float topic8) {
        this.topic8 = topic8;
    }

    public float getTopic9() {
        return topic9;
    }

    public void setTopic9(float topic9) {
        this.topic9 = topic9;
    }
}
