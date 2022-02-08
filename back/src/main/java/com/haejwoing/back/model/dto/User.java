package com.haejwoing.back.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User {
    private int id;
    private String email;
    private String nickname;
    private String gender;
    private String birth;
    private String image;
    private String role;
    private int userStatus;
    private double point;
}
