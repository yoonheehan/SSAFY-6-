package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.Board;
import com.haejwoing.back.model.mapper.BoardMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BoardImpl implements BoardService{

    // 문자화된 배열을 일반 배열로 변환시켜주는 함수
    public List<List> string_change_to_list(String putin){

        String putin_change = putin.substring(1,putin.length()-1);

        String putin_change_replace = putin_change.replace(" ", "");

        List<List> put_in_array_in = putin_change_replace.split(",");

        return put_in_array_in;
    }



    @Autowired
    private SqlSession sqlSession;


    @Override
    public List<Board> getList() {
        return sqlSession.getMapper(BoardMapper.class).getList();
    }

    @Override
    public Board get(int idboard) {
        return sqlSession.getMapper(BoardMapper.class).get(idboard);
    }

    @Override
    public List<Board> getUser(int userId) {

        return sqlSession.getMapper(BoardMapper.class).getUser(userId);
    }

    @Override
    public boolean save(Board board) throws Exception{

        if(board.getContent() == null){
            throw new Exception();
        }
        return sqlSession.getMapper(BoardMapper.class).save(board);
    }

    @Override
    public boolean update(Board board) {

        return sqlSession.getMapper(BoardMapper.class).update(board);
    }

    @Override
    public boolean delete(int idboard){

        sqlSession.getMapper(BoardMapper.class).delete(idboard);
        return sqlSession.getMapper(BoardMapper.class).delete(idboard);
    }

    @Override
    public List<String> get_vote_users(Map<String, Integer> vote_users) {

        int user_id = vote_users.get("userId");
        int board_id = vote_users.get("boardId");
        int idx = vote_users.get("idx");

        String users_who_vote = sqlSession.getMapper(BoardMapper.class).find_vote_list(board_id);



        return null;
    }


}
