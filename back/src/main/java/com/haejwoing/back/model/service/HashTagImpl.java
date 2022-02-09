package com.haejwoing.back.model.service;


import com.haejwoing.back.model.dto.Board;
import com.haejwoing.back.model.dto.HashTag;
import com.haejwoing.back.model.mapper.HashTagMapper;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.apache.ibatis.session.SqlSession;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import springfox.documentation.spring.web.json.Json;
import org.json.simple.parser.JSONParser;

import java.lang.reflect.Array;
import java.util.*;

@Service
public class HashTagImpl implements HashTagService{

    @Autowired
    private SqlSession sqlSession;


    @Override
    public boolean save(Board board) {

        String text = board.getHashArr().substring(1,board.getHashArr().length()-1);

        String[] abc = text.split(",");


        List<String> cde = new ArrayList<>();

        for (int i=0; i<abc.length; i++){
            cde.add(abc[i]);
        }

        board.setHasArrList(cde);


        String recent_id = sqlSession.getMapper(HashTagMapper.class).recent_id(board.getRecent_id());

        board.setRecent_id(recent_id);



        if(cde.isEmpty()) {

            return true;

        }else{


            for (int i = 0; i < cde.size(); i++) {
                String tag_name = cde.get(i);
                String value2 = recent_id;


                if(sqlSession.getMapper(HashTagMapper.class).findtagname(tag_name)==1){

                    String out = sqlSession.getMapper(HashTagMapper.class).getout(tag_name);



                    String textout = out.substring(1,out.length()-1);

                    String[] abcd = textout.split(",");


                    List<String> cdef = new ArrayList<>();

                    for (int j=0; j<abcd.length; j++){
                        cdef.add(abcd[j]);
                    }

                    cdef.add(value2);

                    String newarraystring1 = cdef.toString();

                    HashMap<String, String> mapitem1 = new HashMap<String, String>();
                    mapitem1.put("tag_name", tag_name);
                    mapitem1.put("idBoard", newarraystring1);

                    sqlSession.getMapper(HashTagMapper.class).updateit(mapitem1);

                }   else{
                    List<String> newarray = new ArrayList<>();
                    newarray.add(value2);
                    String newarraystring = newarray.toString();
                    HashMap<String, String> mapitem = new HashMap<String, String>();
                    mapitem.put("tag_name", tag_name);
                    mapitem.put("idBoard", newarraystring);

                    sqlSession.getMapper(HashTagMapper.class).savearray(mapitem);

                }

            }
            return true;
        }
    }

}
