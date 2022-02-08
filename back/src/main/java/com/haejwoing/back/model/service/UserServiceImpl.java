package com.haejwoing.back.model.service;



import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.mapper.UserMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private SqlSession sqlSession;


    @Override
    public void insertUser(User user) {
        sqlSession.getMapper(UserMapper.class).insertUser(user);
    }

    @Override
    public List<User> listAllUser() {
        return sqlSession.getMapper(UserMapper.class).listAllUser();
    }

    @Override
    public User searchByEmail(String email) {
        return sqlSession.getMapper(UserMapper.class).searchByEmail(email);
    }

    @Override
    public void withdrawUser(String email) {
        sqlSession.getMapper(UserMapper.class).withdrawUser(email);
    }

    @Override
    public List<User> listFollower(String email) {
        return sqlSession.getMapper(UserMapper.class).listFollower(email);
    }

    @Override
    public void setPoint(String email) {
        sqlSession.getMapper(UserMapper.class).setPoint(email);
    }

    @Override
    public int getUserId(String email) {
        return sqlSession.getMapper(UserMapper.class).getUserId(email);
    }
}
