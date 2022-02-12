package com.haejwoing.back.model.mapper;

import com.haejwoing.back.model.dto.Comment;
import com.haejwoing.back.model.dto.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {

    List<Comment> getList();

    Comment get(int idcomment);

//    List<Comment> getLikeUser();

    boolean getLike(int userId);

    int save(Comment comment);

    boolean getNum(int boardId);

    boolean update(Comment comment);

    boolean delete(int commentId);

}
