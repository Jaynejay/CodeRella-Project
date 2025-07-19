package com.example.coderellaProject.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "announcements")
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author; // Admin username

    private String recipientUsername; // Paper setter's username

    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDate date;

    // --- Constructors ---
    public Announcement() {}

    public Announcement(String author, String recipientUsername, String title, String message, LocalDate date) {
        this.author = author;
        this.recipientUsername = recipientUsername;
        this.title = title;
        this.message = message;
        this.date = date;
    }

    // --- Getters & Setters ---
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getAuthor() { return author; }

    public void setAuthor(String author) { this.author = author; }

    public String getRecipientUsername() { return recipientUsername; }

    public void setRecipientUsername(String recipientUsername) { this.recipientUsername = recipientUsername; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }

    public void setMessage(String message) { this.message = message; }

    public LocalDate getDate() { return date; }

    public void setDate(LocalDate date) { this.date = date; }
}
