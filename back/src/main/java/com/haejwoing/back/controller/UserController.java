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

    @ApiOperation(value = "회원 가입")
    @PostMapping()
    public ResponseEntity<Map<String, Object>> userRegister(@RequestBody User user) throws IOException {
        log.info("회원 가입 호출");
        log.info("유저 정보 : {}", user);

        List<String> uploadImage = new ArrayList<>();
//        uploadImage = fileService.fileInsert(file);

        log.info("업로드 파일 : {}", uploadImage);

        User userRequest = User.builder()
                .email(user.getEmail())
                .birth(user.getBirth())
                .gender(user.getGender())
                .nickname(user.getNickname())
                .role("ROLE_USER")
                .point(0)
                .userStatus(1)
                .image(user.getImage())
                .build();

        log.info("저장될 유저 정보 : {}", userRequest);
        userService.insertUser(userRequest);

        String jwtToken = new JwtProvider().createJwtToken(userRequest);

        int responseId = userService.getUserId(userRequest.getEmail());

        Map<String, Object> map = new HashMap<>();
        map.put("id", responseId);
        map.put("jwtToken", jwtToken);


        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @ApiOperation(value = "회원정보")
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> userInfo(@PathVariable @ApiParam(value = "유저 id") int id){
        log.info("회원정보 ");
        log.info("{}",id);
        HttpStatus status = HttpStatus.ACCEPTED;


        Map<String, Object> result = new HashMap<>();
        User user = userService.searchById(id);
        log.info("user : {}", user);
        result.put("info", user);


        return new ResponseEntity<Map<String, Object>>(result, status);
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

        return new ResponseEntity<>("회원수정 완료", HttpStatus.OK);
    }

    @ApiOperation(value = "nickname 중복검사")
    @GetMapping("/check/{nickname}")
    public ResponseEntity<Boolean> checkNickname(@PathVariable @ApiParam(value = "해당 닉네임 중복검사") String nickname){
        log.info("중복검사할 닉네임 : {}", nickname);

        // 해당 닉네임 있으면 true
        if(userService.checkNickname(nickname)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else return new ResponseEntity<>(false, HttpStatus.OK); // 없으면 false

//        if(userService.checkNickname(nickname)){
//            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
//        }else return new ResponseEntity<>(false, HttpStatus.OK);

    }
}
