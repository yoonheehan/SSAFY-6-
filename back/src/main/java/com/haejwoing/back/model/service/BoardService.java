package com.haejwoing.back.model.service;

import com.haejwoing.back.model.dto.Board;

import java.util.List;

public interface BoardService {

    List<Board> getList();

    Board get(int boardSeq);

    boolean save(Board board) throws Exception;

    boolean update(Board board);

    boolean delete(int boardSeq);


}