package com.haejwoing.back.model.dto;

import java.util.Map;

public class NaverUser {

    private Map<String, Object> naver;

    public NaverUser(Map<String, Object> naver){
        this.naver = naver;
    }

    public String kakao_account(){
        return (String) naver.get("kakao_account");
    }


}
