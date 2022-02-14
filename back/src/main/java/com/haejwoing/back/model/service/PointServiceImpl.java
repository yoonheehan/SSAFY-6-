package com.haejwoing.back.model.service;

import com.haejwoing.back.model.mapper.PointMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

public class PointServiceImpl implements PointService {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public boolean updatePoint(int userId, int point) {
        return sqlSession.getMapper(PointMapper.class).updatePoint(userId, point);
    }
}
