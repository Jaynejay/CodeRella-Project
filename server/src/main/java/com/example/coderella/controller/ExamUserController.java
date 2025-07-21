package com.example.coderella.controller;

import com.example.coderella.entity.Submission;
import com.example.coderella.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;


@RestController
@RequestMapping("/api/submission")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamUserController {

    @Autowired
    private SubmissionRepository submissionRepository;

    private final String uploadDir = "uploads/";

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,@RequestParam("comment") String comment) throws IOException {
        if (file.getSize() > 50*1024*1024) {
            return ResponseEntity.badRequest().body("File is too large");
        }
        String fileName = UUID.randomUUID() + "_" +file.getOriginalFilename();
        File dest = new File(uploadDir + fileName);
        dest.getParentFile().mkdirs();
        file.transferTo(dest);


        Submission submission = new Submission();
        submission.setFileName(fileName);
        submission.setFilePath(dest.getAbsolutePath());
        submission.setComment(comment);
        submission.setUploadTime(LocalDateTime.now());
        submissionRepository.save(submission);

        return ResponseEntity.ok("File uploaded successfully!");
    }
}
