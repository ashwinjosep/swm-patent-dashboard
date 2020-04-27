package com.swm.dashboard.data.entity;

import javax.persistence.*;

//Entity for accessing data from the patent_keywords ground-truth table
@Entity
@Table(name = "patent_keywords")
public class PatentKeywords {

    @Id
    @Column(name = "patent_id")
    private String patentId;
    @Column(name = "keyword")
    private String keyword;

    public String getPatentId() {
        return patentId;
    }

    public void setPatentId(String patentId) {
        this.patentId = patentId;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }
}
