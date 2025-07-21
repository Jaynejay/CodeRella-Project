// src/main/java/com/example/coderellaProject/dto/UserSummaryDto.java
package com.example.coderellaProject.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSummaryDto {
    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String role;
    private boolean isActive;
}
