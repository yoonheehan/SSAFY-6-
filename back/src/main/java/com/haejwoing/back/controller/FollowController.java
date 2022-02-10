package com.haejwoing.back.controller;

import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.service.UserService;
import io.swagger.annotations.ApiParam;
import io.swagger.models.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/follow")
public class FollowController {

    private UserService userService;

    @GetMapping("/{id}")

    public ResponseEntity<Map<String, Object>> listFollow(@PathVariable @ApiParam(value = "해당 id의 팔로워 가져온다." ) int id){

        log.info("검색 대상 id : {}", id);

        Map<String, Object> result = new HashMap<>();
        List<User> user = userService.listFollow(id);
        result.put("followInfo", user);

        log.info("followInfo {}", result.get("followInfo"));
        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

}
