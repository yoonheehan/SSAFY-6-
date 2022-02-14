package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.Comment;
import com.haejwoing.back.model.dto.Heart;
import com.haejwoing.back.model.dto.User;

import java.util.HashMap;
import java.util.List;

public interface CommentService {

    List<Comment> getList(int boardId);

//    Comment get(int idcomment);

    boolean like(Heart heart);

    boolean unlike(int userId, int commentId);

    boolean save(Comment comment) throws Exception;

    boolean likeUserList(int commentId, String userList);

    List<Integer> get_user_id(int commentId);

    boolean getNum(int boardId);

    boolean minusNum(int boardId);

    boolean update(Comment comment);

    boolean delete(int commentId);

}