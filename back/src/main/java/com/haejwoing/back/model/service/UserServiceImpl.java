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
    public List<User> listFollower(int id) {
        return sqlSession.getMapper(UserMapper.class).listFollower(id);
    }

    @Override
    public List<User> listFollow(int id) {
        return sqlSession.getMapper(UserMapper.class).listFollow(id);
    }

    @Override
    public void setPoint(String email) {
        sqlSession.getMapper(UserMapper.class).setPoint(email);
    }

    @Override
    public int getUserId(String email) {
        return sqlSession.getMapper(UserMapper.class).getUserId(email);
    }

    @Override
    public User searchById(int id) {
        return sqlSession.getMapper(UserMapper.class).userInfo(id);
    }

    @Override
    public void updateProfile(User user) {
        sqlSession.getMapper(UserMapper.class).updateProfile(user);
    }

    @Override
    public Boolean checkNickname(String nickname) {
        return sqlSession.getMapper(UserMapper.class).checkNickname(nickname)==1;
    }
}
