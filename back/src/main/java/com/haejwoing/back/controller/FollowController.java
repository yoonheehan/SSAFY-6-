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
<<<<<<< Updated upstream
    public ResponseEntity<Map<String, Object>> listFollow(@PathVariable @ApiParam(value = "해당 id의 팔로워 가져온다." ) int id){

=======

    public ResponseEntity<Map<String, Object>> listFollower(@PathVariable @ApiParam(value = "해당 이메일의 팔로워들을 가져온다." ) int id){
>>>>>>> Stashed changes
        log.info("검색 대상 id : {}", id);

        Map<String, Object> result = new HashMap<>();
        List<User> user = userService.listFollow(id);
        result.put("followerInfo", user);

        log.info("followInfo {}", result.get("followerInfo"));
        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }
<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes

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
