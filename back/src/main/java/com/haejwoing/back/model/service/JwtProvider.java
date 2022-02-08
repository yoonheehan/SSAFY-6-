package com.haejwoing.back.model.service;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.haejwoing.back.config.jwt.JwtProperties;
import com.haejwoing.back.model.dto.User;


import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    public String createJwtToken(User user){

        String jwtToken = JWT.create()
                .withSubject(user.getNickname())
                .withExpiresAt(new Date(System.currentTimeMillis()+ JwtProperties.EXPIRATION_TIME))
                .withClaim("email", user.getEmail())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
        return jwtToken;
    }

//    public User getUserDtoOf(String authorizationHeader) {
//        validationAuthorizationHeader(authorizationHeader);
//
//        String token = extractToken(authorizationHeader);
//        Claims claims = parsingToken(token);
//
//        return new User(claims);
//    }

//    private Claims parsingToken(String token) {
//        return Jwts.parser()
//                .setSigningKey(JwtProperties.SECRET)
//                .parseClaimsJws(token)
//                .getBody();
//    }
//
//    private void validationAuthorizationHeader(String header) {
//        if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
//            throw new IllegalArgumentException();
//        }
//    }
//
//    private String extractToken(String authorizationHeader) {
//        return authorizationHeader.substring(JwtProperties.TOKEN_PREFIX.length());
//    }
}
