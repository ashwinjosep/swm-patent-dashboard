package com.swm.dashboard.service;

public class StringUtilsService {

    // function to remove any spaces and convert to UpperCase
    public static String getFormattedString(String input) {
        String output = input.trim().toUpperCase();
        return output;
    }

    //function to add prefix and suffix for US patent id format
    public static String getPatentFormattedString(String inputString) {
        int outputLength = inputString.length()+3;
        StringBuilder stringBuilder = new StringBuilder(outputLength);
        stringBuilder.append("US").append(inputString).append("A");
        return stringBuilder.toString();
    }
}
