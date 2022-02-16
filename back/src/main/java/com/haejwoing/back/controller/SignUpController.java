package com.haejwoing.back.controller;

import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.service.JwtProvider;
import com.haejwoing.back.model.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/signup")
public class SignUpController {

    @Autowired
    private UserService userService;

    @ApiOperation(value = "nickname 중복검사")
    @GetMapping("/{nickname}")
    public ResponseEntity<Boolean> checkNickname(@PathVariable @ApiParam(value = "해당 닉네임 중복검사") String nickname){
        log.info("중복검사할 닉네임 : {}", nickname);

        // 해당 닉네임 있으면 true
        if(userService.checkNickname(nickname)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else return new ResponseEntity<>(false, HttpStatus.OK); // 없으면 false

    }

    @ApiOperation(value = "회원 가입")
    @PostMapping()
    public ResponseEntity<Map<String, Object>> userRegister(@RequestBody User user) throws IOException {
        log.info("회원 가입 호출");
        log.info("유저 정보 : {}", user);

        User withdrawCheck = userService.searchByEmail(user.getEmail());
        System.out.println("withdrawCheck"+withdrawCheck);

        if (null == withdrawCheck) { // 처음으로 회원가입
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
        } else if (withdrawCheck.getUserStatus() == 0) { // 탈퇴 했던 유저이면
            log.info("탈퇴했던 회원가입");
            User againUser = User.builder()
                    .email(user.getEmail())
                    .birth(user.getBirth())
                    .gender(user.getGender())
                    .nickname(user.getNickname())
                    .role("ROLE_USER")
                    .point(0)
                    .userStatus(1)
                    .image(user.getImage())
                    .build();

            log.info("again user ; {}", againUser);
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("nickname", againUser.getNickname());
            userMap.put("id", withdrawCheck.getId());
            log.info("userMap : {}", userMap);
            userService.updateByEmail(userMap);

            String jwtToken = new JwtProvider().createJwtToken(againUser);
            int responseId = userService.getUserId(againUser.getEmail());

            Map<String, Object> map = new HashMap<>();
            map.put("id", responseId);
            map.put("jwtToken", jwtToken);

            return new ResponseEntity<>(map, HttpStatus.OK);

        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
