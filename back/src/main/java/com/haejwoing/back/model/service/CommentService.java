package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.Comment;

import java.util.List;

public interface CommentService {

    List<Comment> getList();

    Comment get(int idcomment);

    boolean save(Comment comment) throws Exception;

    boolean update(Comment comment);

    boolean delete(int commentId);

}