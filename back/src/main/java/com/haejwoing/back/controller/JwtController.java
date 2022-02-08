package com.haejwoing.back.controller;

import com.haejwoing.back.model.dto.GoogleUser;
import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.service.JwtProvider;
import com.haejwoing.back.model.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/jwt")
public class JwtController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping("/google")
    public String insertUser(@RequestBody Map<String, Object> data){
        GoogleUser googleUser = new GoogleUser((Map<String, Object>) data.get("profileObj"));

        System.out.println(data.get("profileObj"));
//        System.out.println(googleUser.getEmail());

        User userEntity = userServiceImpl.searchByEmail(googleUser.getEmail());


        if(userEntity == null){
            System.out.println("구글 로그인으로 사이트 처음 방문");
            User userRequest = User.builder()
                    .email(googleUser.getEmail())
                    .nickname(googleUser.getuserName())
                    .role("ROLE_USER")
                    .image(googleUser.getImage())
                    .build();


            userServiceImpl.setPoint(userRequest.getEmail());
            userServiceImpl.insertUser(userRequest);
            userEntity = userServiceImpl.searchByEmail(googleUser.getEmail());

        }

        String jwtToken = new JwtProvider().createJwtToken(userEntity);
        return jwtToken;
    }
}
