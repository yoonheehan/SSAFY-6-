package com.haejwoing.back.model.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class FileServiceImpl implements FileService{

    @Autowired
    private SqlSession sqlSession;

    @Value("${spring.servlet.multipart.location}")
    private String uploadRoot;

    @Override
    public List<String> fileInsert(MultipartFile[] file) throws IOException {

        // 오늘날짜의 폴더명(today)
        String today = new SimpleDateFormat("yymmdd").format(new Date());
        String saveFolder = uploadRoot+ File.separator + today + File.separator;
        log.info("저장 폴더 : {}", saveFolder);

        List<String> list = new ArrayList<>();

        File folder = new File(saveFolder);
        if(!folder.exists()){
            folder.mkdir();
        }

        if(!file[0].isEmpty()){
            for(int i=0; i<file.length; i++){
                log.info("파일 원본 이름 : {}",file[i].toString());
                // 파일의 고유 아이디로 파일명 중복 피하기
                String uuid = UUID.randomUUID().toString();
                String saveFileName = uuid + file[i].getOriginalFilename();
                list.add(saveFolder+ File.separator +saveFileName);
                // 해당경로에 해당 파일명 저장
                file[i].transferTo(new File(folder, saveFileName));
            }
        }
        return list;
    }
}
