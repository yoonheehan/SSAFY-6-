package com.haejwoing.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class User {
    private int id;
    private String email;
    private String password;
    private String nickname;
    private String gender;
    private String birth;
    private String image;
}
