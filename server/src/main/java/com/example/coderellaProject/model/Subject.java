
package com.example.coderellaProject.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name ="subjects" )
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Subject {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String level;

    @ManyToOne(optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "cover_path")
    private String coverPath;

  //  @OneToMany(mappedBy = "subject")
   // private List<PaperSetterSubjectAccess> accesses = new ArrayList<>();

    // Constructors, getters & setters unchanged
}