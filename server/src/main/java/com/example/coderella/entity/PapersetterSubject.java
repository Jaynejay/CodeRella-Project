// File: src/main/java/com/example/coderellaProject/model/PapersetterSubject.java
package com.example.coderella.entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "subjects")
public class PapersetterSubject {

    @Id
    private String id;

    private String title;
    private String level;
    private String imageUrl;
    @ManyToMany(mappedBy = "subjects")
    private Set<User> users;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }


    public Set<User> getUsers() { return users; }
    public void setUsers(Set<User> users) { this.users = users; }
}

