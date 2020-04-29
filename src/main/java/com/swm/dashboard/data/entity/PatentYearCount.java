package com.swm.dashboard.data.entity;

import java.math.BigInteger;

public class PatentYearCount {

    private int year;

    private BigInteger count;

    public PatentYearCount(int year, BigInteger count) {
        this.year = year;
        this.count = count;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public BigInteger getCount() {
        return count;
    }

    public void setCount(BigInteger count) {
        this.count = count;
    }
}
