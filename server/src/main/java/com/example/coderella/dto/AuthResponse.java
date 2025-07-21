package com.example.coderella.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String role;
    private String username;
    private boolean active;
    private boolean profileCompleted;
    private boolean firstLogin;
    private boolean scheduledForDeletion;

}
