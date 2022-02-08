package com.haejwoing.back.controller;

import com.haejwoing.back.model.dto.Comment;
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

    @GetMapping("")
    public ResponseEntity<List<Comment>> CommentList(Comment comment) {
        return new ResponseEntity<List<Comment>>(commentService.getList(), HttpStatus.OK);
    }


    @GetMapping("/{idComment}")
    public ResponseEntity<Comment> CommentList(@PathVariable int idComment){
        return new ResponseEntity<Comment>(commentService.get(idComment), HttpStatus.OK);
    }


    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Comment comment) throws Exception {
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
