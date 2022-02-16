package com.haejwoing.back.controller;

import com.haejwoing.back.model.dto.GoogleUser;
import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.service.JwtProvider;
import com.haejwoing.back.model.service.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/jwt")
public class JwtController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping("/google")
    public ResponseEntity<Map<String, Object>> isGoogleUser(@RequestBody Map<String, Object> data){
        GoogleUser googleUser = new GoogleUser((Map<String, Object>) data.get("profileObj"));
        log.info("data : {}", data);
        log.info("profileObj : {}", data.get("profileObj"));
        User userEntity = userServiceImpl.searchByEmail(googleUser.getEmail());

        if(userEntity == null) {
            log.info("구글 로그인 첫 방문");
            Map<String, Object> map = new HashMap<>();
            map.put("check", false);
            map.put("email", googleUser.getEmail());
            log.info(map.toString());
            return new ResponseEntity<>(map, HttpStatus.OK);

        } else if(userEntity != null) {
            log.info("구글 회원가입 완료 회원 ");
            User userRequest = User.builder()
                    .email(userEntity.getEmail())
                    .nickname(userEntity.getNickname())
                    .role("ROLE_USER")
                    .image(userEntity.getImage())
                    .userStatus(1)
                    .build();

            String jwtToken = new JwtProvider().createJwtToken(userRequest);
            Map<String, Object> map = new HashMap<>();
            map.put("check", true);
            map.put("id", userServiceImpl.getUserId(userEntity.getEmail()));
            map.put("jwtToken", jwtToken);
            log.info("id : {}", map.get("jwtToken"));

            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/naver")
    public ResponseEntity<Map<String, Object>> isNaverUser(@RequestBody Map<String, Object> data){
        log.info("data : {}", data);
        log.info("email : {}", data.get("email"));
        User userEntity = userServiceImpl.searchByEmail((String) data.get("email"));

        if(userEntity == null) {
            log.info("네이버 로그인 첫 방문");
            Map<String, Object> map = new HashMap<>();
            map.put("check", false);
            map.put("email", data.get("email"));
            log.info(map.toString());
            return new ResponseEntity<>(map, HttpStatus.OK);

        } else if(userEntity != null) {
            log.info("네이버 회원가입 완료 회원 ");
            User userRequest = User.builder()
                    .email(userEntity.getEmail())
                    .nickname(userEntity.getNickname())
                    .role("ROLE_USER")
                    .image(userEntity.getImage())
                    .userStatus(1)
                    .build();

            Map<String, Object> map = new HashMap<>();
            map.put("check", true);
            map.put("id", userServiceImpl.getUserId(userEntity.getEmail()));
            log.info("id : {}", map.get("id"));

            String jwtToken = new JwtProvider().createJwtToken(userRequest);
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/kakao")
    public ResponseEntity<Map<String, Object>> isKakaoUser(@RequestBody Map<String, Object> data){
        log.info("data : {}", data);
        log.info("data.profile : {}", data.get("profile"));
        Map<String, Object> kakaoMap = new HashMap<>();
        kakaoMap = (Map<String, Object>) data.get("profile");
        log.info("kakao_account {}", kakaoMap.get("kakao_account"));

        Map<String, Object> str = new HashMap<>();
        str = (Map<String, Object>) kakaoMap.get("kakao_account");

        System.out.println(str.get("email"));

        User userEntity = userServiceImpl.searchByEmail((String) str.get("email"));

        if(userEntity == null) {
            log.info("카카오 로그인 첫 방문");
            Map<String, Object> map = new HashMap<>();
            map.put("check", false);
            map.put("email", str.get("email"));
            log.info(map.toString());
            return new ResponseEntity<>(map, HttpStatus.OK);

        } else if(userEntity != null) {
            log.info("카카오 회원가입 완료 회원 ");
            User userRequest = User.builder()
                    .email(userEntity.getEmail())
                    .nickname(userEntity.getNickname())
                    .role("ROLE_USER")
                    .image(userEntity.getImage())
                    .userStatus(1)
                    .build();

            Map<String, Object> map = new HashMap<>();
            map.put("check", true);
            map.put("id", userServiceImpl.getUserId(userEntity.getEmail()));
            log.info("id : {}", map.get("id"));

            String jwtToken = new JwtProvider().createJwtToken(userRequest);
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
