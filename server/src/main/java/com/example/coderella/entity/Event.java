// Event.java
package com.example.coderella.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "events")
public class Event {
    @Id @GeneratedValue private Long id;
    private LocalDate eventDate;
    private String label;
    private String subject;
    @ManyToOne @JoinColumn(name = "course_manager_id") private User courseManager;
    @ManyToOne @JoinColumn(name = "papersetter_id") private User papersetter;
}
