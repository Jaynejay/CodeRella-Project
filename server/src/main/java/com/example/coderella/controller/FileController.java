package com.example.coderella.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.File;

@RestController
@RequestMapping("/uploads")
public class FileController {

    private static final String SUBJECT_IMAGE_DIR =
            "C:/Users/DELL/OneDrive/Desktop/New/new/CodeRella-Project/server/uploads/subject_covers/";

    @GetMapping("/subject_covers/{filename:.+}")
    public FileSystemResource getSubjectCover(
            @PathVariable String filename,
            HttpServletResponse response) {

        File file = new File(SUBJECT_IMAGE_DIR + filename);
        if (file.exists()) {
            response.setContentType(MediaType.IMAGE_JPEG_VALUE); // Or PNG if needed
            return new FileSystemResource(file);
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }
    }
}
