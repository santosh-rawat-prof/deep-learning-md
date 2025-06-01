package com.backend.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.model.Result;
import com.backend.services.FileService;

@RestController
@RequestMapping("/api")
public class HomeController {

    @Autowired
    private FileService fileService;
    private String filePath = System.getProperty("user.dir") + File.separator + "images";
    
    @PostMapping("/predict")
    public ResponseEntity<?> classify(@RequestParam("image")MultipartFile image) {

        String fileName = null;
        try {
            fileName = fileService.uploadFile(filePath, image);
            if (fileName.equals("Invalid Format")) {
                return new ResponseEntity<>("Format not supported. Only JPG format support.", HttpStatus.BAD_REQUEST);
            }
        } catch (IOException e) {
            return new ResponseEntity<>("Internal Server Error: " + e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(fileName, HttpStatus.CREATED);

        // Result result = new Result();
        // result.setEquipment("Needle");
        // result.setBrand("J&J");
        // result.setConfidence("80");
        // return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /* Test your frontend using this API */
    @GetMapping("/test")
    public ResponseEntity<?> testApi() {
        return new ResponseEntity<>("This is test response from server", HttpStatus.OK);
    }
    
}
