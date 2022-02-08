package com.haejwoing.back.model.mapper;

import com.haejwoing.back.model.dto.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    void insertUser(User user);
    User searchByEmail(String email);
    List<User> listAllUser();
    void withdrawUser(String email);
    void setPoint(String email);
    List<User> listFollower(String email);
}
