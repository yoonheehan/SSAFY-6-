package com.haejwoing.back.model.dto;


import lombok.Data;

@Data
public class HashTag {

    private int idTag;
    private String tag_name;
    private String idBoard;
    private String due_date;
}
