package com.haejwoing.back.model.mapper;

import com.haejwoing.back.model.dto.Comment;
import com.haejwoing.back.model.dto.Heart;
import com.haejwoing.back.model.dto.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {

    List<Comment> getList(int boardId);

//    Comment get(int idcomment);

    int like(Heart heart);

    boolean unlike(int userId, int commentId);

    int save(Comment comment);

    boolean likeUserList(int commentId, String userList);

    List<Integer> get_user_id(int commentId);

    boolean getNum(int boardId);

    boolean update(Comment comment);

    boolean delete(int commentId);


}
