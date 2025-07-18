package com.example.coderellaProject.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    private boolean isActive = false;  // For approval by SUPER_ADMIN
    private boolean isProfileCompleted = false;  // After user submits full profile
    @Column(nullable = false)
    private boolean firstLogin = false; // default false, only true for users created by admin

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] profileImage;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String resetToken;// Added for forgot password functionality
}
