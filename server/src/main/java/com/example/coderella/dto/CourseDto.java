// src/main/java/com/example/coderellaProject/dto/CourseDto.java
package com.example.coderella.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class CourseDto {
    private Long sNo;

    @NotBlank
    private String code;

    @NotBlank
    private String name;

    @NotBlank
    private String title;

    @NotBlank
    private String level;

    // this will be bound from your FormData
    private MultipartFile image;
}
