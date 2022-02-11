package com.haejwoing.back.model.service;


import com.haejwoing.back.model.dto.Board;
import com.haejwoing.back.model.dto.HashTag;

import java.util.List;

public interface HashTagService {


    List<Board> getList_hashtag(String tag_name);

    boolean save(Board board);



}
