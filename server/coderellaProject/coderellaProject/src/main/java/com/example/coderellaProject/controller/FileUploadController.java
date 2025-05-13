package com.example.coderellaProject.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @Value("${file.upload-dir:uploads}")
    private String uploadDir;

    @Value("${file.max-size:52428800}") // Default 50MB
    private long maxFileSize;

    private static final List<String> ALLOWED_FILE_TYPES = Arrays.asList(
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );


    // to upload files
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Please select a file to upload");
            }

            // Validate file size
            if (file.getSize() > maxFileSize) {
                return ResponseEntity.badRequest().body(
                    String.format("File size exceeds the maximum limit of %d MB", maxFileSize / (1024 * 1024))
                );
            }

            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || !ALLOWED_FILE_TYPES.contains(contentType)) {
                return ResponseEntity.badRequest().body(
                    "Invalid file type. Only PDF and DOCX files are allowed. Received: " + contentType
                );
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFilename = UUID.randomUUID().toString() + extension;

            // Create upload directory
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save file
            Path filePath = uploadPath.resolve(newFilename);
            Files.copy(file.getInputStream(), filePath);

            // Create response with submission status
            Map<String, Object> response = new HashMap<>();
            response.put("message", "File uploaded successfully");
            response.put("url", "/uploads/" + newFilename);
            response.put("originalFilename", originalFilename);
            response.put("size", file.getSize());
            response.put("type", contentType);
            response.put("submissionStatus", "DONE");
            response.put("redirectUrl", "/addsubmission"); // URL to redirect to after upload
            
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to upload file: " + e.getMessage());
        }
    }

    //get file list
    @GetMapping("/list")
    public ResponseEntity<?> listFiles() {
        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                return ResponseEntity.ok(Collections.emptyList());
            }

            List<Map<String, Object>> files = Files.list(uploadPath)
                .map(path -> {
                    Map<String, Object> fileInfo = new HashMap<>();
                    try {
                        fileInfo.put("name", path.getFileName().toString());
                        fileInfo.put("size", Files.size(path));
                        fileInfo.put("lastModified", Files.getLastModifiedTime(path).toInstant().toString());
                        fileInfo.put("url", "/uploads/" + path.getFileName().toString());
                        fileInfo.put("submissionStatus", "DONE");
                    } catch (IOException e) {
                        // Skip files that can't be read
                    }
                    return fileInfo;
                })
                .collect(Collectors.toList());

            return ResponseEntity.ok(files);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to list files: " + e.getMessage());
        }
    }

    //to delete a file
    @DeleteMapping("/{filename}")
    public ResponseEntity<?> deleteFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir, filename);
            if (!Files.exists(filePath)) {
                return ResponseEntity.notFound().build();
            }

            Files.delete(filePath);
            return ResponseEntity.ok().body("File deleted successfully");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Failed to delete file: " + e.getMessage());
        }
    }
} 