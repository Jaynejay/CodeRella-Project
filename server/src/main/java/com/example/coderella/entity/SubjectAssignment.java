package com.example.coderella.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "subject_assignments", uniqueConstraints = @UniqueConstraint(columnNames = {"subjectCode", "paperSetterRegistrationId"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class SubjectAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectCode;

    private String paperSetterRegistrationId;

    private LocalDateTime assignedAt = LocalDateTime.now();
}
