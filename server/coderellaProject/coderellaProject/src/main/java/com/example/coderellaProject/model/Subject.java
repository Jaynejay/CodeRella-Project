package com.example.coderellaProject.model;

import jakarta.persistence.*;
import lombok.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "subjects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subject {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false, unique = true)
        private String code;

        @Column(nullable = false)
        private String name;

        @Column
        private String description;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "course_id")
        private Course course;
    }
}
