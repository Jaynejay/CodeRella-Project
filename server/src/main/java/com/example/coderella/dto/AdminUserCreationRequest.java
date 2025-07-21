package com.example.coderella.dto;

import lombok.Data;

@Data
public class AdminUserCreationRequest {
    private String username;
    private String email;
    private String password;
}
