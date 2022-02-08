package com.haejwoing.back.model.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Comment {
    private int idComment;
    private String content;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private int board_idboard;
    private int user_id;

}
