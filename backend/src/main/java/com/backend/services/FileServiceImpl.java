package com.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {
    @Override
    public String uploadFile(String path, MultipartFile file) throws IOException {

        // Check the path exist or not
        File rootDir = new File(path);
        if(!rootDir.exists()) {
            rootDir.mkdir();
        }

        // Get the file name
        String fileName = file.getOriginalFilename();

        // Get the format
        String format = fileName.substring(fileName.lastIndexOf('.'));

        // check the file format
        if(!format.equalsIgnoreCase(".jpeg")) {
            return "Invalid Format";
        }

        // change the file name to random name
        String randomFileName = UUID.randomUUID().toString() + format;

        // Create destination path of file
        File savePath = new File(path + File.separator + randomFileName);

        // Copy the file to destination
        Files.copy(file.getInputStream(), Paths.get(savePath.toURI()));

        return fileName;
    }
}
