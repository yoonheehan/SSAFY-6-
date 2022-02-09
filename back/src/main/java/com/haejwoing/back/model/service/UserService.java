package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.User;

import java.util.List;


public interface UserService {
    void insertUser(User user);
    List<User> listAllUser();
    User searchByEmail(String email);
    void withdrawUser(String email);
    void setPoint(String email);
    List<User> listFollower(String email);
    int getUserId(String email);
    User searchById(int id);
}
