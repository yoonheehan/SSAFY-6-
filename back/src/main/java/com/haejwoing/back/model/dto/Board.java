package com.haejwoing.back.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Board {

    private int idboard;
    private String view_range;
    private String content;
    private String board_image;
    private int type;

    private int created_at;
    private LocalDateTime updated_at;
    private int due_date;
    private String vote_contents;

    private int voteNum;

    private String hashArr;
    private int userId;
    private int commentNum;

    private List hasArrList;

    private String recent_id;

    private String error_message;
}
