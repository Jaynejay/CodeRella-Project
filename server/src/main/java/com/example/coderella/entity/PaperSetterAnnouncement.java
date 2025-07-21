// PaperSetterAnnouncement.java
package com.example.coderella.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PaperSetterAnnouncement {
    @Id @GeneratedValue private Long id;
    private String subject;
    @Column(columnDefinition = "TEXT") private String message;
    private String author;
    private LocalDateTime sentAt;
    private Long paperSetterId;
}

