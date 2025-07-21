package com.example.coderella.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "*")
public class SubmissionController {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @GetMapping("/status")
    public ResponseEntity<?> getSubmissionStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "DONE");
        response.put("message", "Submission completed successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/details")
    public ResponseEntity<?> getSubmissionDetails() {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                return ResponseEntity.ok(Collections.emptyMap());
            }

            // Get the most recently modified file
            Path latestFile = Files.list(uploadPath)
                .max((p1, p2) -> {
                    try {
                        return Files.getLastModifiedTime(p1).compareTo(Files.getLastModifiedTime(p2));
                    } catch (IOException e) {
                        return 0;
                    }
                })
                .orElse(null);

            if (latestFile == null) {
                return ResponseEntity.ok(Collections.emptyMap());
            }

            Map<String, Object> response = new HashMap<>();
            response.put("status", "DONE");
            response.put("submissionDate", Files.getLastModifiedTime(latestFile).toInstant().toString());
            response.put("fileName", latestFile.getFileName().toString());
            response.put("fileSize", formatFileSize(Files.size(latestFile)));
            response.put("lastModified", Files.getLastModifiedTime(latestFile).toInstant().toString());
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to get submission details: " + e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    private String formatFileSize(long bytes) {
        if (bytes < 1024) return bytes + " B";
        int exp = (int) (Math.log(bytes) / Math.log(1024));
        String pre = "KMGTPE".charAt(exp-1) + "";
        return String.format("%.1f %sB", bytes / Math.pow(1024, exp), pre);
    }
} 