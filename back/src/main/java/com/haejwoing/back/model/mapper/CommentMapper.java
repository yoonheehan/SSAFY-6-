package com.haejwoing.back.model.mapper;

import com.haejwoing.back.model.dto.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {

    List<Comment> getList();

    Comment get(int idcomment);

    int save(Comment comment);

    boolean update(Comment comment);

    boolean delete(int commentId);

}
