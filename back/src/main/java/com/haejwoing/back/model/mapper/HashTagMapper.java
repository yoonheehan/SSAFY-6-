package com.haejwoing.back.model.mapper;


import com.haejwoing.back.model.dto.Board;
import com.haejwoing.back.model.dto.HashTag;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Mapper
public interface HashTagMapper {

    String getHashList(String tag_name);

    boolean save(Board board);

    String recent_id(String boardid);

    int findtagname(String value1);

    void savearray(Map mapitem);

    String getout_board(String tag_name);

    String getout_due_date(String tag_name);


    void updateit(Map mapitem1);

    void update_new(Map mapitem3);


    String get_due_date_from_tag(String tag_name);

    String get_board_from_tag(String tag_name);

    Board get_raw_data(int idboard);

    void delete_hash(String tag_name);


}
