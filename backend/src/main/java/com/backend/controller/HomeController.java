package com.backend.controller;

import java.io.File;
import java.io.IOException;

import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.backend.model.Result;
import com.backend.services.FileService;

@RestController
@RequestMapping("/api")
public class HomeController {

    @Autowired
    private FileService fileService;
    private String filePath = System.getProperty("user.dir") + File.separator + "images";

    /* Test your frontend using this API */
    @GetMapping("/test")
    public ResponseEntity<?> testApi() {
        return new ResponseEntity<>("This is test response from server", HttpStatus.OK);
    }

    @PostMapping("/predict")
    public ResponseEntity<Result> predictImage(@RequestParam("file") MultipartFile image) throws IOException {

        // First save the image
        String fileName = save(image);
        // In future we can store it on database with file name and search

        String pythonApiUrl = "http://localhost:8000/predict";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(image.getBytes()) {
            @Override
            public String getFilename() {
                return image.getOriginalFilename();
            }
        });

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(pythonApiUrl, requestEntity, String.class);

        // Convert the response into json object and load into Result model
        String jsonString = response.getBody();
        JSONObject jsonObject = new JSONObject(jsonString);

        String name = jsonObject.getString("prediction");
        String confidence = String.valueOf(100 * Double.valueOf(String.valueOf(jsonObject.get("confidence"))));

        Result result = new Result();
        result.setEquipment(name);
        result.setConfidence(confidence);

        return ResponseEntity.ok(result);
    }

    public String save(MultipartFile image) {

        String fileName = null;
        try {
            fileName = fileService.uploadFile(filePath, image);
        } catch (IOException e) {
            return e.getLocalizedMessage();
        }
        return fileName;
    }

}
