package com.haejwoing.back.controller;


import com.haejwoing.back.model.dto.*;
import com.haejwoing.back.model.mapper.CommentMapper;
import com.haejwoing.back.model.service.*;
import com.sun.net.httpserver.Authenticator;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private UserService userService;

    @Autowired
    private HashTagService hashTagService;

    @Autowired
    private VoteUsersService voteUsersService;


    @GetMapping("")
    public ResponseEntity<List<Board>> BoardList(Board board){

        return new ResponseEntity<List<Board>>(boardService.getList(), HttpStatus.OK);
    }


    @GetMapping("/detail/{idboard}")
    public ResponseEntity<Board> BoardList(@PathVariable int idboard){
        return new ResponseEntity<Board>(boardService.get(idboard), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Board>> getUser(@PathVariable int userId){
        return new ResponseEntity<List<Board>>(boardService.getUser(userId), HttpStatus.OK);

    }


    @GetMapping("/hashtagsearch/{tag_name}")
    public ResponseEntity<List<Board>> HashTagList(@PathVariable String tag_name){

        return new ResponseEntity<List<Board>>(hashTagService.getList_hashtag(tag_name), HttpStatus.OK);
    }

    @PostMapping("/savevoteusers")
    public ResponseEntity<String> VoteUsersList(@RequestBody VoteUsersImport voteUsersImport){

        voteUsersService.save_vote_users(voteUsersImport);


        int userId = voteUsersImport.getUser_id();
        Map<String, Object> map1 = new HashMap<>();

        double score = 3;
        map1.put("userId", userId);
        map1.put("score", score);

        // 글 등록한 유저아이디 가져와서
        System.out.println(userId);
        userService.setPoint(map1);



        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @GetMapping("/getvoteusers/{idboard}")
    public ResponseEntity<Map<String, Object>> GetVoteUsersList(@PathVariable int idboard){


        Map<String, Object> map = new HashMap<>();
        map.put("userid", boardService.getUserid(idboard));
        map.put("idx", boardService.getIdx(idboard));




        return new ResponseEntity<>(map, HttpStatus.OK);
    }



    @PostMapping("/save")
   public ResponseEntity<String> save(@RequestBody Board board) throws Exception {

        if(boardService.save(board)){

            Map<String, Object> map = new HashMap<>();
            int userId = board.getUserId();
            double score = 5;
            map.put("userId", userId);
            map.put("score", score);

            // 글 등록한 유저아이디 가져와서
            System.out.println(userId);
            userService.setPoint(map);
            if(hashTagService.save(board)) {

                return new ResponseEntity<String>(HttpStatus.OK);
            }
            return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update")

    public ResponseEntity<String> update(@RequestBody Board board){
        System.out.println(board);
        if(boardService.update(board)){
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    }


    @DeleteMapping("/delete/{idboard}")
    public ResponseEntity<String> delete(@PathVariable int idboard){
        if(boardService.delete(idboard)){
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "전체공개와 친구의 게시글을 가져온다")
    @GetMapping("/{id}")
    public ResponseEntity<List<Board>> listRangeBoard(@PathVariable @ApiParam("해당 id의 친구와 전체공개 게시글가저온다") int id){
        log.info("검색 대상 id : {}", id);
        // 해당 id의 팔로워 목록가져온다
        List<Map<String, Object>> result = userService.getfollowerId(id);


            List<Integer> list = new ArrayList<>();
            for(int i=0; i<result.size(); i++){
                list.add(Integer.parseInt(String.valueOf(result.get(i).get("to_user"))));
            }
            list.add(id);
            System.out.println("list : "+list);
            boardService.getFollowerFeed(list);
            System.out.println(boardService.getFollowerFeed(list));
            if(boardService.getFollowerFeed(list).isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else return new ResponseEntity<List<Board>>(boardService.getFollowerFeed(list), HttpStatus.OK);

    }
}
