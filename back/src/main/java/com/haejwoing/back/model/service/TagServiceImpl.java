package com.haejwoing.back.model.service;

import com.haejwoing.back.model.mapper.TagMapper;
import io.swagger.annotations.Tag;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements TagService {

//    @Autowired
//    private SqlSession sqlSession;
//
//    @Override
//    public List<Tag> getList() {
//        return sqlSession.getMapper(TagMapper.class).getList();
//    }
}
