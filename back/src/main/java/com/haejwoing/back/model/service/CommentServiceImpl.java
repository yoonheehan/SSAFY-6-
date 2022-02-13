package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.Board;
import com.haejwoing.back.model.dto.Comment;
import com.haejwoing.back.model.dto.Heart;
import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.mapper.CommentMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{

    List<Integer> like_users = new ArrayList<>();

    @Autowired
    private SqlSession sqlSession;

    @Override
    public List<Comment> getList() {
        return sqlSession.getMapper(CommentMapper.class).getList();
    }

    @Override
    public Comment get(int idcomment) {

        return sqlSession.getMapper(CommentMapper.class).get(idcomment);
    }

    @Override
    public boolean like(Heart heart) {
        return sqlSession.getMapper(CommentMapper.class).like(heart) == 1;
    }

    @Override
    public boolean unlike(int userId) {
        sqlSession.getMapper(CommentMapper.class).unlike(userId);

        return sqlSession.getMapper(CommentMapper.class).unlike(userId);
    }

    @Override
    public boolean save(Comment comment) throws Exception {
        if (comment.getContent() == null) {
            throw new Exception();
        }

        return sqlSession.getMapper(CommentMapper.class).save(comment) == 1;
    }

    @Override
    public boolean getNum(int boardId) {

        return sqlSession.getMapper(CommentMapper.class).getNum(boardId);
    }

    @Override
    public boolean update(Comment comment) {

        return sqlSession.getMapper(CommentMapper.class).update(comment);
    }

    @Override
    public boolean delete(int commentId) {

        sqlSession.getMapper(CommentMapper.class).delete(commentId);

        return sqlSession.getMapper(CommentMapper.class).delete(commentId);
    }
}