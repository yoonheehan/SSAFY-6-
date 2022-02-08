package com.haejwoing.back.model.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {

    List<String> fileInsert(MultipartFile[] file) throws IOException;
}
