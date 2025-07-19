package com.example.coderellaProject.dto;

import lombok.Data;

@Data
public class AdminUserCreationRequest {
    private String username;
    private String email;
    private String password;
}
