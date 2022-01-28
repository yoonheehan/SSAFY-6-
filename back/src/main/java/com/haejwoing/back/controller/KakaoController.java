package com.haejwoing.back.controller;

import com.haejwoing.back.kakao.KaKaoLogin;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/kakao")
public class KakaoController {
    private KaKaoLogin kakao_restapi = new KaKaoLogin();

    @GetMapping(value="/login")
    public String kakaoConnect() {

        StringBuffer url = new StringBuffer();
        url.append()
    }

}
