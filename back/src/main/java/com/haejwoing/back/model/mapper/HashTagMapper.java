package com.haejwoing.back.model.mapper;


import com.haejwoing.back.model.dto.Board;
import com.haejwoing.back.model.dto.HashTag;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.Map;


@Mapper
public interface HashTagMapper {


    boolean save(Board board);

    String recent_id(String boardid);

    int findtagname(String value1);

    void savearray(Map mapitem);

    String getout(String tag_name);


    void updateit(Map mapitem1);

}
