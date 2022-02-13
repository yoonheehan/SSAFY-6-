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
    public List<Integer> getUserid(int boardId) {
        return sqlSession.getMapper(BoardMapper.class).getUserId(boardId);
    }

    @Override
    public List<Integer> getIdx(int boardId) {
        return sqlSession.getMapper(BoardMapper.class).getIdx(boardId);
    }



}
