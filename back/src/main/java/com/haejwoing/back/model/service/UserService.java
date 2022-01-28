package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.mapper.UserMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private SqlSession sqlSession;

    public boolean join(User user){

        return sqlSession.getMapper(UserMapper.class).join(user) == 1;
    }
}
