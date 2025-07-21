package com.example.coderella.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "exam_subjects")
public class ExamSubject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    // Correct relation to ExamCourse
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_course_id")
    private ExamCourse examCourse;
}
