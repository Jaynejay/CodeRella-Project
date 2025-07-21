// Announcement.java
package com.example.coderella.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "announcements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Announcement {
    @Id @GeneratedValue private Long id;
    private String author;
    private String title;
    @Column(columnDefinition = "TEXT") private String message;
    private LocalDate date;
}