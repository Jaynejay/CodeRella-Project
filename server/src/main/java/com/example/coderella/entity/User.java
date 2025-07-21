package com.example.coderella.entity;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String registrationId;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    private String firstname;
    private String lastname;
    private String nic;
    private String designation;
    private LocalDate dateOfBirth;

    @ElementCollection
    private List<String> phoneNumbers;

    @ElementCollection
    private List<String> languages;

    private String homeNo;
    private String street;
    private String city;
    private String district;

    private String accountHolderName;
    private String accountNumber;
    private String bankName;
    private String branch;

    private boolean isActive = false;
    private boolean isProfileCompleted = false;

    @Column(nullable = false)
    private boolean firstLogin = false;

    @Column(name = "scheduled_for_deletion")
    private boolean scheduledForDeletion = false;

    @Column(name = "deletion_scheduled_at")
    private LocalDateTime deletionScheduledAt;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] profileImage;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String resetToken;

    @ManyToMany
    @JoinTable(
            name = "subject_assignments",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private Set<PapersetterSubject> subjects;
}