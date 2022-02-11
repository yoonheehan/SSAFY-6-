package com.haejwoing.back.model.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import nonapi.io.github.classgraph.json.Id;
import springfox.documentation.spring.web.json.Json;

import javax.swing.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

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
    private String vote_users;
    private String hashArr;
    private int userId;

    private List hasArrList;

    private String recent_id;

}
