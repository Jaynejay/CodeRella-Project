package com.example.coderella.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "submissions") // Specify the table name

public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;
    private String filePath;
    private String comment;
    private LocalDateTime uploadTime;

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setFilePath(String absolutePath) {
        this.filePath = absolutePath;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setUploadTime(LocalDateTime now) {
        this.uploadTime = now;
    }


}