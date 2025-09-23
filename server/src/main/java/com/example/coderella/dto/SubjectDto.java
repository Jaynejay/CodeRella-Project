// src/main/java/com/example/coderellaProject/dto/SubjectDto.java
package com.example.coderella.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class SubjectDto {
    @NotBlank
    private String code;

    @NotBlank
    private String title;

    // For your FormData upload:
    private MultipartFile image;
}
