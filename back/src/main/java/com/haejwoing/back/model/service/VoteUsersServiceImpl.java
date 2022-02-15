package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.VoteUsersImport;
import com.haejwoing.back.model.mapper.BoardMapper;
import com.haejwoing.back.model.mapper.VoteUsersMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class VoteUsersServiceImpl implements VoteUsersService{

    @Autowired
    SqlSession sqlSession;


    @Override
    public void save_vote_users(VoteUsersImport voteUsersImport) {

        int idboard = voteUsersImport.getBoard_idboard();
        List<Integer> user_id = sqlSession.getMapper(BoardMapper.class).getUserId(idboard);

        HashMap<String, Integer> temporary = new HashMap<>();

        if(user_id.isEmpty()){
            int voteNum = 1;
            temporary.put("idboard", idboard);
            temporary.put("voteNum", voteNum);
            sqlSession.getMapper(BoardMapper.class).update_board_vote_num(temporary);
        }else {
            int voteNum = user_id.size() + 1;
            temporary.put("idboard", idboard);
            temporary.put("voteNum", voteNum);
            sqlSession.getMapper(BoardMapper.class).update_board_vote_num(temporary);
        }

        sqlSession.getMapper(VoteUsersMapper.class).save_vote_users(voteUsersImport);
    }


}
