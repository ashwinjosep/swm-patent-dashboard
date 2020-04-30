package com.swm.dashboard.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "patent_similarities_bert")
public class PatentSimilaritiesBert {

    @Id
    @Column(name = "patent_id")
    private String patentId;

    @Column(name = "patent1")
    private String patent1;

    @Column(name = "similarity1")
    private float similarity1;

    @Column(name = "patent2")
    private String patent2;

    @Column(name = "similarity2")
    private float similarity2;

    @Column(name = "patent3")
    private String patent3;

    @Column(name = "similarity3")
    private float similarity3;

    @Column(name = "patent4")
    private String patent4;

    @Column(name = "similarity4")
    private float similarity4;

    @Column(name = "patent5")
    private String patent5;

    @Column(name = "similarity5")
    private float similarity5;

    @Column(name = "patent6")
    private String patent6;

    @Column(name = "similarity6")
    private float similarity6;

    @Column(name = "patent7")
    private String patent7;

    @Column(name = "similarity7")
    private float similarity7;

    @Column(name = "patent8")
    private String patent8;

    @Column(name = "similarity8")
    private float similarity8;

    @Column(name = "patent9")
    private String patent9;

    @Column(name = "similarity9")
    private float similarity9;

    @Column(name = "patent10")
    private String patent10;

    @Column(name = "similarity10")
    private float similarity10;

    public String getPatent6() {
        return patent6;
    }

    public void setPatent6(String patent6) {
        this.patent6 = patent6;
    }

    public float getSimilarity6() {
        return similarity6;
    }

    public void setSimilarity6(float similarity6) {
        this.similarity6 = similarity6;
    }

    public String getPatent7() {
        return patent7;
    }

    public void setPatent7(String patent7) {
        this.patent7 = patent7;
    }

    public float getSimilarity7() {
        return similarity7;
    }

    public void setSimilarity7(float similarity7) {
        this.similarity7 = similarity7;
    }

    public String getPatent8() {
        return patent8;
    }

    public void setPatent8(String patent8) {
        this.patent8 = patent8;
    }

    public float getSimilarity8() {
        return similarity8;
    }

    public void setSimilarity8(float similarity8) {
        this.similarity8 = similarity8;
    }

    public String getPatent9() {
        return patent9;
    }

    public void setPatent9(String patent9) {
        this.patent9 = patent9;
    }

    public float getSimilarity9() {
        return similarity9;
    }

    public void setSimilarity9(float similarity9) {
        this.similarity9 = similarity9;
    }

    public String getPatent10() {
        return patent10;
    }

    public void setPatent10(String patent10) {
        this.patent10 = patent10;
    }

    public float getSimilarity10() {
        return similarity10;
    }

    public void setSimilarity10(float similarity10) {
        this.similarity10 = similarity10;
    }

    public String getPatentId() {
        return patentId;
    }

    public void setPatentId(String patentId) {
        this.patentId = patentId;
    }

    public String getPatent1() {
        return patent1;
    }

    public void setPatent1(String patent1) {
        this.patent1 = patent1;
    }

    public float getSimilarity1() {
        return similarity1;
    }

    public void setSimilarity1(float similarity1) {
        this.similarity1 = similarity1;
    }

    public String getPatent2() {
        return patent2;
    }

    public void setPatent2(String patent2) {
        this.patent2 = patent2;
    }

    public float getSimilarity2() {
        return similarity2;
    }

    public void setSimilarity2(float similarity2) {
        this.similarity2 = similarity2;
    }

    public String getPatent3() {
        return patent3;
    }

    public void setPatent3(String patent3) {
        this.patent3 = patent3;
    }

    public float getSimilarity3() {
        return similarity3;
    }

    public void setSimilarity3(float similarity3) {
        this.similarity3 = similarity3;
    }

    public String getPatent4() {
        return patent4;
    }

    public void setPatent4(String patent4) {
        this.patent4 = patent4;
    }

    public float getSimilarity4() {
        return similarity4;
    }

    public void setSimilarity4(float similarity4) {
        this.similarity4 = similarity4;
    }

    public String getPatent5() {
        return patent5;
    }

    public void setPatent5(String patent5) {
        this.patent5 = patent5;
    }

    public float getSimilarity5() {
        return similarity5;
    }

    public void setSimilarity5(float similarity5) {
        this.similarity5 = similarity5;
    }
}
