package com.haejwoing.back.controller;

import com.haejwoing.back.model.dto.Comment;
import com.haejwoing.back.model.dto.Heart;
import com.haejwoing.back.model.dto.User;
import com.haejwoing.back.model.service.CommentService;
import com.haejwoing.back.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

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

    // @RequestParam : loginId
    @PostMapping("/like")
    public ResponseEntity<String> like(@RequestBody Heart heart) {
        int commentId = heart.getComment_idcomment();
        int userId = heart.getUser_id();

        List<Integer> userList = commentService.get_user_id(commentId);
        if(commentService.like(heart)){
            if (userList.contains(userId)) {
                commentService.unlike(userId, commentId);
                userList.remove(Integer.valueOf(userId));
            } else {
                userList.add(userId);
            }
            String userList2 = Arrays.toString(userList.toArray());
            commentService.likeUserList(commentId, userList2);

            return new ResponseEntity<String>(HttpStatus.OK);
        }
        else {
            if (commentService.like(heart)) {

                return new ResponseEntity<String>(HttpStatus.OK);
            } else {
                return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
            }
        }
    }

//    @DeleteMapping("{commentId}/unlike/{userId}")
//    public ResponseEntity<String> unlike(@PathVariable int userId,
//                                         @PathVariable int commentId){
//        if(commentService.unlike(userId, commentId)){
//            return new ResponseEntity<String>(HttpStatus.OK);
//        }
//        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
//    }

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Comment comment) throws Exception {
        int boardId = comment.getBoard_idboard();
        commentService.getNum(boardId);
        if(commentService.save(comment)){

            int userId = comment.getUser_id();
            Map<String, Object> map1 = new HashMap<>();

            double score = 2;
            map1.put("userId", userId);
            map1.put("score", score);

            // 글 등록한 유저아이디 가져와서
            System.out.println(userId);
            userService.setPoint(map1);


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
    public ResponseEntity<String> delete(@PathVariable int idComment, @RequestParam int boardId){

        commentService.minusNum(boardId);
        if(commentService.delete(idComment)){
            return new ResponseEntity<String>(HttpStatus.OK);
        }
        return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
    }
}
