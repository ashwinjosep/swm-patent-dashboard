package com.swm.dashboard.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

//Entity for accessing patent citations table
@Entity
@Table(name = "patent_citations")
public class PatentCitations {

    @Id
    @Column(name = "patent_id")
    private String patentId;

    @Column(name = "citation_count")
    private int citationCount;

    @Column(name = "citations")
    private String citations;

    public String getPatentId() {
        return patentId;
    }

    public void setPatentId(String patentId) {
        this.patentId = patentId;
    }

    public int getCitationCount() {
        return citationCount;
    }

    public void setCitationCount(int citationCount) {
        this.citationCount = citationCount;
    }

    public String getCitations() {
        return citations;
    }

    public void setCitations(String citations) {
        this.citations = citations;
    }
}
