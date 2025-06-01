package com.backend.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.model.Result;

@RestController
@RequestMapping("/api")
public class HomeController {

    @PostMapping("/predict")
    public ResponseEntity<?> classify() {
        Result result = new Result();
        result.setEquipment("Needle");
        result.setBrand("J&J");
        result.setConfidence("80%");
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /* Test your frontend using this API */
    @GetMapping("/test")
    public ResponseEntity<?> testApi() {
        return new ResponseEntity<>("This is test response from server", HttpStatus.OK);
    }
    
}
