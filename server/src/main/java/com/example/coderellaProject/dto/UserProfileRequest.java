package com.example.coderellaProject.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class UserProfileRequest {
    private String username;
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