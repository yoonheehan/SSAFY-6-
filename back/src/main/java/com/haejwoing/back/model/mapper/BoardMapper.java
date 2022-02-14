package com.haejwoing.back.model.mapper;

import com.haejwoing.back.model.dto.Board;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface BoardMapper {

    List<Board> getList();

    Board get(int boardSeq);

    List<Board> getUser(int userId);

    boolean save(Board board);

    boolean update(Board board);

    boolean delete(int boardSeq);

    int due_date_id(int due_date_id);

    List<Integer> getUserId(int boardId);

    List<Integer> getIdx(int boardId);


    void update_board_vote_num(HashMap temporary);

    int get_user_id_from_board(int boardid);

    List<Board> getFollowerFeed(List<Integer> list);

}
