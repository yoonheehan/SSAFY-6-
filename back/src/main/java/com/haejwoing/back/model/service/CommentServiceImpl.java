package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.Board;
import com.haejwoing.back.model.dto.Comment;
import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.mapper.CommentMapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{

    // 문자화된 배열을 일반 배열로 변환시켜주는 함수
    public List<String> string_change_to_list(String putin){

        String putin_change = putin.substring(1,putin.length()-1);

        String putin_change_replace = putin_change.replace(" ", "");

        List<String> put_in_array_in = List.of(putin_change_replace.split(","));

        return put_in_array_in;
    }


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

    public boolean getLike(User user) {
        int user_id = user.getId();
        Comment comment = new Comment();
//        int comment_user_id = comment.getUser_id();
//        if (user_id == comment_user_id) {
//            return false;
//        }
        if (like_users.contains(user_id)) {
            int index = like_users.indexOf(user_id);
            like_users.remove(index);
        } else {
            like_users.add(user_id);
        }
        return true;
//        return sqlSession.getMapper(CommentMapper.class).getLike();
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