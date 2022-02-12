package com.haejwoing.back.controller;


import com.haejwoing.back.model.dto.Board;
import com.haejwoing.back.model.dto.HashTag;
import com.haejwoing.back.model.dto.VoteUsers;
import com.haejwoing.back.model.service.BoardService;
import com.haejwoing.back.model.service.HashTagService;
import com.sun.net.httpserver.Authenticator;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private HashTagService hashTagService;

    @GetMapping("")
    public ResponseEntity<List<Board>> BoardList(Board board){

        return new ResponseEntity<List<Board>>(boardService.getList(), HttpStatus.OK);
    }


    @GetMapping("/{idboard}")
    public ResponseEntity<Board> BoardList(@PathVariable int idboard){
        return new ResponseEntity<Board>(boardService.get(idboard), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Board>> getUser(@PathVariable int userId){
        return new ResponseEntity<List<Board>>(boardService.getUser(userId), HttpStatus.OK);
    }


    @GetMapping("/hashtagsearch")
    public ResponseEntity<List<Board>> HashTagList(@RequestBody Map<String, String> import_tag_name){

        return new ResponseEntity<List<Board>>(hashTagService.getList_hashtag(import_tag_name.get("tag_name")), HttpStatus.OK);
    }


    @PutMapping("/getvoteusers")
    public ResponseEntity<VoteUsers> VoteUsersList(@RequestBody Map<String, Integer> vote_users){

        return null;
//        return new ResponseEntity<String>(boardService.get_vote_users(vote_users), HttpStatus.OK);
    }



    @PostMapping("/save")
   public ResponseEntity<String> save(@RequestBody Board board) throws Exception {

        if(boardService.save(board)){

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



}
