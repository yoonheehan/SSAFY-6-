package com.haejwoing.back.controller;

import com.haejwoing.back.model.dto.User;

import com.haejwoing.back.model.service.JwtProvider;
import com.haejwoing.back.model.service.UserServiceImpl;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;


    @ApiOperation(value = "회원정보")
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> userInfo(@PathVariable @ApiParam(value = "유저 id") int id){
        log.info("회원정보 ");
        log.info("{}",id);

        Map<String, Object> result = new HashMap<>();
        User user = userService.searchById(id);
        double percentage = userService.getPercentage(id);
        user.setPoint(percentage);
        log.info("user : {}", user);
        result.put("info", user);


        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "모든 사용자")
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> listAllUser(){
        log.info("모든 사용자 정보 반환");

        Map<String, Object> result = new HashMap<>();
        List<User> allUser = userService.listAllUser();
        result.put("allUser", allUser);

        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "회원 탈퇴")
    @PutMapping("/withdraw/{id}")
    public ResponseEntity<String> withdrawUser(@PathVariable @ApiParam int id){
        // 인증 작업 필요
        userService.withdrawUser(id);

        return new ResponseEntity<>("회원탈퇴 완료", HttpStatus.OK);

    }

    @ApiOperation(value = "프로필 수정")
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProfile(@PathVariable int id, @RequestBody @ApiParam(value = "해당 정보로 프로필 수정요청") User user){
        log.info("프로필 수정할 id : {}" , id);
        user.setId(id);
        log.info("프로필 수정할 정보 : {}", user);

        userService.updateProfile(user);
        User modifyUser = userService.searchById(id);
        String jwtToken = new JwtProvider().createJwtToken(modifyUser);

        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }



    @ApiOperation(value = "해당 닉네임 유저 찾기")
    @GetMapping("/find/{nickname}")
    public ResponseEntity<List<User>> findUserByNickname(@PathVariable @ApiParam(value = "해당 닉네임의 유저를 찾아 반환") String nickname){
        log.info("검색 닉네임 : {}", nickname);
        List<User> list = userService.findByNickname(nickname);
        if(list.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else{
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
    }
}
