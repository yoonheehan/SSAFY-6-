package com.haejwoing.back.config.jwt;

public interface JwtProperties {
    String SECRET = "test";
    int EXPIRATION_TIME = 864000;
    String TOKEN_PREFIX = "Barer";
    String HEADER_STRING = "Authoriztion";
}
