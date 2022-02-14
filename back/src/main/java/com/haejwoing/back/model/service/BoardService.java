package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.Board;

import java.util.List;
import java.util.Map;

public interface BoardService {

    List<Board> getList();

    Board get(int boardSeq);

    List<Board> getUser(int userId);

    boolean save(Board board) throws Exception;

    boolean update(Board board);

    boolean delete(int boardSeq);

    List<Integer> getUserid(int boardId);

    List<Integer> getIdx(int boardId);

    int get_user_id_from_board(int boardid);

    List<Board> getFollowerFeed(List<Integer> list);
}