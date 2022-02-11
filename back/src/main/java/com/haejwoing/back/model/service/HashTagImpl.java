package com.haejwoing.back.model.service;


import com.haejwoing.back.model.dto.Board;
import com.haejwoing.back.model.dto.HashTag;
import com.haejwoing.back.model.mapper.BoardMapper;
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
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class HashTagImpl implements HashTagService{

    @Autowired
    private SqlSession sqlSession;


    @Override
    public List<HashTag> getList_hashtag(String tag_name) {


        // due_date 리스트 꺼내기
        String want_due_date_list =sqlSession.getMapper(HashTagMapper.class).get_due_date_from_tag(tag_name);

        String want_due_date_list_first = want_due_date_list.substring(1,want_due_date_list.length()-1);


        String want_due_date_list_second = want_due_date_list_first.replace(" ", "");

        String[] want_due_date_array = want_due_date_list_second.split(",");


        List<String> want_due_date_list_made = new ArrayList<>();

        for (int i=0; i<want_due_date_array.length; i++){
            want_due_date_list_made.add(want_due_date_array[i]);
        }

        // board 리스트 꺼내기

        String want_board_list =sqlSession.getMapper(HashTagMapper.class).get_board_from_tag(tag_name);


        String want_board_list_first = want_board_list.substring(1,want_board_list.length()-1);

        String want_board_list_second = want_board_list_first.replace(" ", "");

        String[] want_board_array = want_board_list_second.split(",");


        List<String> want_board_list_made = new ArrayList<>();

        for (int i=0; i<want_board_array.length; i++){
            want_board_list_made.add(want_board_array[i]);
        }


        // 마감 시간 넘은것들은 거르는 프로그램
        LocalDateTime localDateTime = LocalDateTime.now();


        int timestamp2 = Math.round((Timestamp.valueOf(localDateTime).getTime()/1000));
        List<String> new_board_list = new ArrayList<>();
        List<Integer> new_due_date_list = new ArrayList<>();
        HashMap<String, String> mapitem3 = new HashMap<String, String>();



        for(int i=0; i<want_due_date_list_made.size(); i++){
            if(Integer.parseInt(want_due_date_list_made.get(i))-timestamp2 > 0) {

                new_board_list.add(want_board_list_made.get(i));
                new_due_date_list.add(Integer.parseInt(want_due_date_list_made.get(i)));
            }

        mapitem3.put("tag_name", tag_name);
        mapitem3.put("idBoard", new_board_list.toString());
        mapitem3.put("due_date", new_due_date_list.toString());

        sqlSession.getMapper(HashTagMapper.class).update_new(mapitem3);

        }

        List get_board_list_from_hashtag = sqlSession.getMapper(HashTagMapper.class).getHashList(tag_name);

        List<String> new_string_list = new ArrayList<String>();

        System.out.println(get_board_list_from_hashtag.get(0));

        return get_board_list_from_hashtag;
    }


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

        int due_date_id = sqlSession.getMapper(BoardMapper.class).due_date_id(board.getDue_date());


        if(cde.isEmpty()) {

            return true;

        }else{


            for (int i = 0; i < cde.size(); i++) {

                String tag_name = cde.get(i).substring(1,cde.get(i).length()-1);

                String value2 = recent_id;
                String value3 = Integer.toString(due_date_id);


                if(sqlSession.getMapper(HashTagMapper.class).findtagname(tag_name)==1){

                    String out = sqlSession.getMapper(HashTagMapper.class).getout(tag_name);
                    String out1 = sqlSession.getMapper(HashTagMapper.class).getout_due_date(tag_name);

                    // board id 받아오는곳
                    String textout = out.substring(1,out.length()-1);

                    String str = textout.replace(" ","");

                    String[] abcd = str.split(",");


                    List<String> cdef = new ArrayList<>();

                    for (int j=0; j<abcd.length; j++){
                        cdef.add(abcd[j]);
                    }

                    cdef.add(value2);


                    // due_date 받아오는곳
                    String textout1 = out1.substring(1,out1.length()-1);

                    String str1 = textout1.replace(" ","");

                    String[] abcde = str1.split(",");
                    System.out.println("abcde " + Arrays.toString(abcde));


                    List<String> cdefg = new ArrayList<>();

                    for (int j=0; j<abcde.length; j++){
                        cdefg.add(abcde[j]);
                    }
                    System.out.println("cdefg에 추가전 " + cdefg);
                    cdefg.add(value3);
                    System.out.println("cdefg에 추가한후 " + cdefg);

                    // update 하는 부분
                    String newarraystring1 = cdef.toString();

                    String newarraystring1_due_date = cdefg.toString();


                    HashMap<String, String> mapitem1 = new HashMap<String, String>();
                    mapitem1.put("tag_name", tag_name);
                    mapitem1.put("idBoard",newarraystring1);
                    mapitem1.put("due_date",newarraystring1_due_date);

                    sqlSession.getMapper(HashTagMapper.class).updateit(mapitem1);

                }   else{
                    List<String> newarray = new ArrayList<>();
                    newarray.add(value2);


                    List<String> newarray_due_date = new ArrayList<>();
                    newarray_due_date.add(value3);


                    String newarraystring = newarray.toString();
                    String newarraystring_due_date = newarray_due_date.toString();

                    HashMap<String, String> mapitem = new HashMap<String, String>();
                    mapitem.put("tag_name", tag_name);
                    mapitem.put("idBoard",newarraystring);
                    mapitem.put("due_date",newarraystring_due_date);


                    sqlSession.getMapper(HashTagMapper.class).savearray(mapitem);

                }

            }
            return true;
        }
    }

}
