package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.Comment;
import com.haejwoing.back.model.dto.User;

import java.util.List;

public interface CommentService {

    List<Comment> getList();

    Comment get(int idcomment);

//    List<Comment> getLikeUser();

    boolean getLike(User user);

    boolean save(Comment comment) throws Exception;

    boolean getNum(int boardId);

    boolean update(Comment comment);

    boolean delete(int commentId);

}