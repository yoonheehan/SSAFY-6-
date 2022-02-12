package com.haejwoing.back.controller;

import com.haejwoing.back.model.dto.Comment;
import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/board/{board_id}/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("")
    public ResponseEntity<List<Comment>> CommentList(Comment comment) {
        System.out.println(comment);
        return new ResponseEntity<List<Comment>>(commentService.getList(), HttpStatus.OK);
    }

//    @GetMapping("/getLikeUser")
//    public ResponseEntity<List<Comment>> likeList(Comment comment) {
//        return new ResponseEntity<List<Comment>>(commentService.getLike(), HttpStatus.OK);
//    }

//    @GetMapping("/getLike")
//    public ResponseEntity<Comment> getLike(@PathVariable int userId){
//        return new ResponseEntity<Comment>(commentService.getLike(userId), HttpStatus.OK);
//    }

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
