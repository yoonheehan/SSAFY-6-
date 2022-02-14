package com.haejwoing.back.model.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PointMapper {

    boolean updatePoint(int userId, int point);

}
