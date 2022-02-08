package com.haejwoing.back.controller;

import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/follow")
public class FollowController {

    @Autowired
    private UserService userService;

    @ApiOperation(value = "팔로워 목록 불러오기")
    @GetMapping("/{email}")
    public ResponseEntity<Map<String, Object>> listFollower(@PathVariable @ApiParam(value = "해당 이메일의 팔로워들을 가져온다." ) String email){
        log.info("검색 대상 : ");
        log.info("{}", email);

        Map<String, Object> result = new HashMap<>();

        List<User> user = userService.listFollower(email);
        result.put("followerInfo",user);
        log.info("followerInfo");
        log.info("{}", result.get("followerInfo"));
        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

//    @ApiOperation(value = "팔로우 하기")
//    @PostMapping("/{email}")
//    public ResponseEntity<String> doFollow
}
