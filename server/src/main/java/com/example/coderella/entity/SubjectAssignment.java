package com.example.coderella.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "subject_assignments", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"subject_code", "paper_setter_registration_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_code", referencedColumnName = "code", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paper_setter_registration_id", referencedColumnName = "registration_id", nullable = false)
    private PaperSetter paperSetter;

    private LocalDateTime assignedAt = LocalDateTime.now();
}
