package com.haejwoing.back.controller;

import com.haejwoing.back.model.dto.Comment;
import com.haejwoing.back.model.dto.Heart;
import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    //board_id 로 바꾸기
    @GetMapping("/{boardId}")
    public ResponseEntity<List<Comment>> CommentList(@PathVariable int boardId) {
        System.out.println(boardId);
        return new ResponseEntity<List<Comment>>(commentService.getList(boardId), HttpStatus.OK);
    }
//
//    @GetMapping("/{commentId}")
//    public ResponseEntity<Comment> getComment(@PathVariable int commentId) {
//        return new ResponseEntity<Comment>(commentService.get(commentId), HttpStatus.OK);
//    }

    @PostMapping("/like")
    public ResponseEntity<String> like(@RequestBody Heart heart) {
        System.out.println(heart);
        if(commentService.like(heart)){
            return new ResponseEntity<String>(HttpStatus.OK);
        }

        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/unlike/{userId}")
    public ResponseEntity<String> unlike(@PathVariable int userId){
        if(commentService.unlike(userId)){
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Comment comment) throws Exception {
        int boardId = comment.getBoard_idboard();
        commentService.getNum(boardId);
        if(commentService.save(comment)){
            return new ResponseEntity<String>(HttpStatus.OK);
        }

        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Comment comment){
        System.out.println(comment);
        if(commentService.update(comment)){
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    }


    @DeleteMapping("/delete/{idComment}")
    public ResponseEntity<String> delete(@PathVariable int idComment){
        if(commentService.delete(idComment)){
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }
}
