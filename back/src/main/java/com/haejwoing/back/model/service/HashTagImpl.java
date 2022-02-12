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

    // 문자화된 배열을 일반 배열로 변환시켜주는 함수
    public List<String> string_change_to_list(String putin){

        String putin_change = putin.substring(1,putin.length()-1);

        String putin_change_replace = putin_change.replace(" ", "");

        List<String> put_in_array_in = List.of(putin_change_replace.split(","));

        return put_in_array_in;
    }


    @Autowired
    private SqlSession sqlSession;


    @Override
    public List<Board> getList_hashtag(String tag_name) {

        // due_date 리스트 꺼내기
        String want_due_date_list =sqlSession.getMapper(HashTagMapper.class).get_due_date_from_tag(tag_name);

        if(want_due_date_list==null){

            sqlSession.getMapper(HashTagMapper.class).delete_hash(tag_name);

            List<Board> board = new ArrayList<>();

            return board;
        }


        List<String> want_due_date_array = string_change_to_list(want_due_date_list);


        // board 리스트 꺼내기
        String want_board_list =sqlSession.getMapper(HashTagMapper.class).get_board_from_tag(tag_name);

        List<String> want_board_array = string_change_to_list(want_board_list);


        // 마감 시간 넘은것들은 거르는 프로그램
        LocalDateTime localDateTime = LocalDateTime.now();

        int timestamp2 = Math.round((Timestamp.valueOf(localDateTime).getTime()/1000));
        List<String> new_board_list = new ArrayList<>();
        List<Integer> new_due_date_list = new ArrayList<>();
        HashMap<String, String> mapitem_raw_data = new HashMap<String, String>();

        // 검색할때 마다 update시키기
        for(int i=0; i<want_due_date_array.size(); i++){
            if(Integer.parseInt(want_due_date_array.get(i))-timestamp2 > 0) {

                new_board_list.add(want_board_array.get(i));
                new_due_date_list.add(Integer.parseInt(want_due_date_array.get(i)));
            }
        }

        mapitem_raw_data.put("tag_name", tag_name);
        mapitem_raw_data.put("idBoard", new_board_list.toString());
        mapitem_raw_data.put("due_date", new_due_date_list.toString());

        sqlSession.getMapper(HashTagMapper.class).update_new(mapitem_raw_data);


        // 해당 태그가 들어있는 board raw 데이터 꺼내기
        String get_board_list_from_hashtag = sqlSession.getMapper(HashTagMapper.class).getHashList(tag_name);


        if(get_board_list_from_hashtag.equals("[]")){

            sqlSession.getMapper(HashTagMapper.class).delete_hash(tag_name);

            List<Board> board = new ArrayList<>();


            return board;
        }

        List<String> got_text = string_change_to_list(get_board_list_from_hashtag);

        List<Board> final_board_list = new ArrayList<>();

        for(int i=0; i<got_text.size(); i++){
            int idboard = Integer.parseInt(got_text.get(i));

            Board board_list = sqlSession.getMapper(HashTagMapper.class).get_raw_data(idboard);
            final_board_list.add(board_list);
        }

        return final_board_list;
    }


    @Override
    public boolean save(Board board) {

        String text = board.getHashArr().substring(1,board.getHashArr().length()-1);

        List<String> list_of_arr_string = List.of(text.split(","));

        board.setHasArrList(list_of_arr_string);

        String recent_id = sqlSession.getMapper(HashTagMapper.class).recent_id(board.getRecent_id());

        board.setRecent_id(recent_id);

        int due_date_id = sqlSession.getMapper(BoardMapper.class).due_date_id(board.getDue_date());


        // 빈리스트면
        if(list_of_arr_string.isEmpty()) {

            return true;

        }else{

            for (int i = 0; i < list_of_arr_string.size(); i++) {

                String tag_name = list_of_arr_string.get(i).substring(1,list_of_arr_string.get(i).length()-1);
                String get_due_date = Integer.toString(due_date_id);

                // 해쉬태그가 처음이 아니라면(리스트 안에 있다면)
                if(sqlSession.getMapper(HashTagMapper.class).findtagname(tag_name)==1){

                    String out_board = sqlSession.getMapper(HashTagMapper.class).getout_board(tag_name);
                    String out_due_date = sqlSession.getMapper(HashTagMapper.class).getout_due_date(tag_name);

                    // board id 받아오는곳
                    List<String> out_board_list = string_change_to_list(out_board);

                    List<String> new_out_board_list = new ArrayList<>();

                    for (int j=0; j<out_board_list.size(); j++){
                        new_out_board_list.add(out_board_list.get(j));
                    }

                    new_out_board_list.add(recent_id);


                    // due_date 받아오는곳
                    List<String> out_due_date_list = string_change_to_list(out_due_date);

                    List<String> new_out_due_date_list = new ArrayList<>();

                    for (int j=0; j<out_due_date_list.size(); j++){
                        new_out_due_date_list.add(out_due_date_list.get(j));
                    }

                    new_out_due_date_list.add(get_due_date);


                    // update 하는 부분
                    String newarraystring_board = new_out_board_list.toString();

                    String newarraystring_due_date = new_out_due_date_list.toString();


                    HashMap<String, String> mapitem_if_not_first = new HashMap<String, String>();
                    mapitem_if_not_first.put("tag_name", tag_name);
                    mapitem_if_not_first.put("idBoard",newarraystring_board);
                    mapitem_if_not_first.put("due_date",newarraystring_due_date);

                    sqlSession.getMapper(HashTagMapper.class).updateit(mapitem_if_not_first);

                }   else{
                    List<String> newarray = new ArrayList<>();
                    newarray.add(recent_id);


                    List<String> newarray_due_date = new ArrayList<>();
                    newarray_due_date.add(get_due_date);

                    String newarraystring = newarray.toString();
                    String newarraystring_due_date = newarray_due_date.toString();

                    HashMap<String, String> mapitem_if_first = new HashMap<String, String>();
                    mapitem_if_first.put("tag_name", tag_name);
                    mapitem_if_first.put("idBoard",newarraystring);
                    mapitem_if_first.put("due_date",newarraystring_due_date);

                    sqlSession.getMapper(HashTagMapper.class).savearray(mapitem_if_first);

                }

            }
            return true;
        }
    }

}
