package com.haejwoing.back.model.service;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.haejwoing.back.config.jwt.JwtProperties;
import com.haejwoing.back.model.dto.User;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class JwtProvider {

    public String createJwtToken(User user){

        String jwtToken = JWT.create()
                .withSubject(user.getNickname())
                .withExpiresAt(new Date(System.currentTimeMillis()))
                .withClaim("email", user.getEmail())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
        return jwtToken;
    }

    public Boolean isExpried(String jwt) throws JsonProcessingException {
        Map<String, Object> claimMap = null;
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(JwtProperties.SECRET) // Set Key
                    .parseClaimsJws(jwt) // 파싱 및 검증, 실패 시 에러
                    .getBody();

            claimMap = claims;

            //Date expiration = claims.get("exp", Date.class);
            //String data = claims.get("data", String.class);

        } catch (ExpiredJwtException e) { // 토큰이 만료되었을 경우
            System.out.println(e);
        } catch (Exception e) { // 그외 에러났을 경우
            System.out.println(e);
        }
        return true;
    }

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

