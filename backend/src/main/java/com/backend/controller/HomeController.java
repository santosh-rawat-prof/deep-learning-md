package com.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HomeController {

    @PostMapping("/predict")
    public ResponseEntity<?> classify() {
        return new ResponseEntity<>("Simple response", HttpStatus.OK);
    }

    /* Test your frontend using this API */
    @GetMapping("/test")
    public ResponseEntity<?> testApi() {
        return new ResponseEntity<>("This is test response from server", HttpStatus.OK);
    }
    
}
