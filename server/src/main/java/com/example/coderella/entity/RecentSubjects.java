package com.example.coderella.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recent_subjects")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RecentSubjects {

    @Id
    private String code;  // Use subject code as primary key

    private String title;
    private String courseCode;
    private String level;
    private String coverPath;

    private LocalDateTime lastAccessed;
}
