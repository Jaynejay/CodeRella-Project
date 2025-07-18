// File: src/main/java/com/example/coderellaProject/model/User.java
package com.example.coderellaProject.model;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String registrationId;
    private String username;
    private String email;
    private String password;
    private String role;

    @ManyToMany
    @JoinTable(
            name = "subject_assignments",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private Set<PapersetterSubject> subjects;

    // Getters and Setters
    public Long getId() { return id; }

    public String getRegistrationId() { return registrationId; }
    public void setRegistrationId(String registrationId) { this.registrationId = registrationId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Set<PapersetterSubject> getSubjects() { return subjects; }
    public void setSubjects(Set<PapersetterSubject> subjects) { this.subjects = subjects; }
}
