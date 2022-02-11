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

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> listFollow(@PathVariable @ApiParam(value = "해당 id의 팔로워 가져온다." ) int id){

        log.info("검색 대상 id : {}", id);

        Map<String, Object> result = new HashMap<>();
        List<User> user = userService.listFollow(id);
        result.put("followerInfo", user);

        log.info("followInfo {}", result.get("followerInfo"));
        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

    @ApiOperation(value = "팔로우 체크")
    @GetMapping("/check/{id}")
    public ResponseEntity<Boolean> checkFollow(@PathVariable int id, Map<String, Object> data){
        log.info("검색 대상 id : {}", id);
        log.info("로그인한 유저 id : {}", data.get("loginedId"));
        System.out.println(data);
        int loginedId = (int) data.get("loginedId");

        // 서로 팔로우 되있으면 true
        if(userService.checkFollow(id, loginedId)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }else return new ResponseEntity<>(false, HttpStatus.OK); // 아니면 false
    }

    @ApiOperation(value = "팔로우 하기")
    @PostMapping("/{id}")
    public ResponseEntity<Boolean> doFollow(@PathVariable @ApiParam(value = "해당 아이디의 팔로 추가") int id, int toUser){
        log.info("팔로우 신청 id : {}", id);
        log.info("팔로우 할 id : {}", toUser);

        if(userService.addFollow(id, toUser)){
            return new ResponseEntity<>(true,HttpStatus.OK);
        }else return new ResponseEntity<>(false, HttpStatus.OK);
    }

}
