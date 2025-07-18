package com.example.coderellaProject.dto;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String token;
    private String newPassword;
    private String confirmPassword;
}
