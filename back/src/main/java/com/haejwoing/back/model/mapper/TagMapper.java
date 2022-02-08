package com.haejwoing.back.model.mapper;

import com.haejwoing.back.model.dto.Tag;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TagMapper {

    List<Tag> getList();

    int save(Tag tag);

}
