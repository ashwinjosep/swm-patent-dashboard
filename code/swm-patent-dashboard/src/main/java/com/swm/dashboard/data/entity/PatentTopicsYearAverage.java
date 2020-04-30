package com.swm.dashboard.data.entity;

import java.math.BigDecimal;

public class PatentTopicsYearAverage {

    private int year;
    private BigDecimal topic0;
    private BigDecimal topic1;
    private BigDecimal topic2;
    private BigDecimal topic3;
    private BigDecimal topic4;
    private BigDecimal topic5;
    private BigDecimal topic6;
    private BigDecimal topic7;
    private BigDecimal topic8;
    private BigDecimal topic9;

    public PatentTopicsYearAverage(int year, BigDecimal topic0, BigDecimal topic1, BigDecimal topic2, BigDecimal topic3, BigDecimal topic4, BigDecimal topic5, BigDecimal topic6, BigDecimal topic7, BigDecimal topic8, BigDecimal topic9) {
        this.year = year;
        this.topic0 = topic0;
        this.topic1 = topic1;
        this.topic2 = topic2;
        this.topic3 = topic3;
        this.topic4 = topic4;
        this.topic5 = topic5;
        this.topic6 = topic6;
        this.topic7 = topic7;
        this.topic8 = topic8;
        this.topic9 = topic9;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public BigDecimal getTopic0() {
        return topic0;
    }

    public void setTopic0(BigDecimal topic0) {
        this.topic0 = topic0;
    }

    public BigDecimal getTopic1() {
        return topic1;
    }

    public void setTopic1(BigDecimal topic1) {
        this.topic1 = topic1;
    }

    public BigDecimal getTopic2() {
        return topic2;
    }

    public void setTopic2(BigDecimal topic2) {
        this.topic2 = topic2;
    }

    public BigDecimal getTopic3() {
        return topic3;
    }

    public void setTopic3(BigDecimal topic3) {
        this.topic3 = topic3;
    }

    public BigDecimal getTopic4() {
        return topic4;
    }

    public void setTopic4(BigDecimal topic4) {
        this.topic4 = topic4;
    }

    public BigDecimal getTopic5() {
        return topic5;
    }

    public void setTopic5(BigDecimal topic5) {
        this.topic5 = topic5;
    }

    public BigDecimal getTopic6() {
        return topic6;
    }

    public void setTopic6(BigDecimal topic6) {
        this.topic6 = topic6;
    }

    public BigDecimal getTopic7() {
        return topic7;
    }

    public void setTopic7(BigDecimal topic7) {
        this.topic7 = topic7;
    }

    public BigDecimal getTopic8() {
        return topic8;
    }

    public void setTopic8(BigDecimal topic8) {
        this.topic8 = topic8;
    }

    public BigDecimal getTopic9() {
        return topic9;
    }

    public void setTopic9(BigDecimal topic9) {
        this.topic9 = topic9;
    }
}
