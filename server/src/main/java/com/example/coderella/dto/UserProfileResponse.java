package com.example.coderella.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class UserProfileResponse {
    private String username;
    private String email;
    private String role;

    private String firstname;
    private String lastname;
    private String nic;
    private String designation;
    private LocalDate dateOfBirth;
    private List<String> phoneNumbers;
    private List<String> languages;
    private String homeNo;
    private String street;
    private String city;
    private String district;

    private String accountHolderName;
    private String accountNumber;
    private String bankName;
    private String branch;
}
