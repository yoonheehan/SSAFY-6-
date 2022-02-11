package com.haejwoing.back.model.mapper;

import com.haejwoing.back.model.dto.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    void insertUser(User user);
    User searchByEmail(String email);
    List<User> listAllUser();
    void withdrawUser(int id);
    void setPoint(String email);
    List<User> listFollower(int id);
    List<User> listFollow(int id);
    int getUserId(String email);
    User userInfo(int id);
    void updateProfile(User user);
    int checkNickname(String nickname);
    int addFollow(int id, int toUser);
    int checkFollow(int id, int loginedId);
    int unFollow(int toUser, int fromUser);
}
