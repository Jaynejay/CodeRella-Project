package com.example.coderellaProject.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String filePath;
    private String comment;
    private LocalDateTime uploadTime;

    public void setFileName(String fileName) {
    }

    public void setFilePath(String absolutePath) {
    }

    public void setComment(String comment) {
    }

    public void setUploadTime(LocalDateTime now) {
    }

    // Getters and setters
}