package com.haejwoing.back.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class User {
    private int id;
    private String email;
    private String nickname;
    private int gender;
    private String birth;
    private String image;
    private String role;
    private int userStatus;
    private double point;
}
