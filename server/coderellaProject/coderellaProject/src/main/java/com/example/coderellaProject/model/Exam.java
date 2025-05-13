package com.example.coderellaProject.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "exams")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Integer year;

    @Column(name = "image_url")
    private String imageUrl;

    public Exam(){}
        public Exam(String title, Integer year,String imageUrl ){
            this.title = title;
            this.year = year;
            this.imageUrl = imageUrl;
    }
}
