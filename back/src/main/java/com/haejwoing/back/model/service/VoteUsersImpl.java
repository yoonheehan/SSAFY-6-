package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.VoteUsersImport;
import com.haejwoing.back.model.mapper.VoteUsersMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteUsersImpl implements VoteUsersService{

    @Autowired
    SqlSession sqlSession;


    @Override
    public void save_vote_users(VoteUsersImport voteUsersImport) {
        System.out.println(voteUsersImport);
        sqlSession.getMapper(VoteUsersMapper.class).save_vote_users(voteUsersImport);
    }


}
