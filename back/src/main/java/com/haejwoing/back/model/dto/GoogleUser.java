package com.haejwoing.back.model.dto;

import java.util.Map;

public class GoogleUser {

    private Map<String, Object> google;

    public GoogleUser(Map<String, Object> google){
        this.google = google;
    }

    public String getuserName(){
        return (String) google.get("name");
    }

    public String getEmail(){
        return (String) google.get("email");
    }

    public String getImage(){ return (String) google.get("imageUrl");}

}
