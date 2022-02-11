package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.User;

import java.util.List;


public interface UserService {
    void insertUser(User user);
    List<User> listAllUser();
    User searchByEmail(String email);
    void withdrawUser(int id);
    void setPoint(String email);
    List<User> listFollower(int id);
    List<User> listFollow(int id);
    int getUserId(String email);
    User searchById(int id);
    void updateProfile(User user);
    Boolean checkNickname(String nickname);
    Boolean addFollow(int id, int toUser);
    Boolean checkFollow(int id, int loginedId);
    Boolean unFollow(int toUser, int fromUser);
}
