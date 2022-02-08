package com.haejwoing.back.controller;

import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.service.UserServiceImpl;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.models.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/{nickname}")
    public ResponseEntity<Map<String, Object>> userInfo(@PathVariable @ApiParam(value = "유저 nickname") String nickname){
        log.info("회원정보 ");
        log.info("{}",nickname);
        HttpStatus status = HttpStatus.ACCEPTED;

        Map<String, Object> result = new HashMap<>();
        User user = userService.searchByEmail(nickname);
        System.out.println(user);
        result.put("info", user);

        return new ResponseEntity<Map<String, Object>>(result, status);
    }

    @ApiOperation(value = "모든 사용자")
    @GetMapping()
    public ResponseEntity<Map<String, Object>> listAllUser(){
        log.info("모든 사용자 정보 반환");

        Map<String, Object> result = new HashMap<>();
        List<User> allUser = userService.listAllUser();
        result.put("allUser", allUser);

        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "회원 탈퇴")
    @PutMapping("/withdraw/{email}")
    public ResponseEntity<String> withdrawUser(@PathVariable @ApiParam String email){
        // 인증 작업 필요

        userService.withdrawUser(email);

        return new ResponseEntity<>("회원탈퇴 완료", HttpStatus.OK);

    }

}
