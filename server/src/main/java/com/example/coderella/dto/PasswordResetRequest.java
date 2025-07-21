package com.example.coderella.dto;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String token;
    private String newPassword;
    private String confirmPassword;
}
