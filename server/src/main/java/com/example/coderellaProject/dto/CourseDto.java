// src/main/java/com/example/coderellaProject/dto/CourseDto.java
package com.example.coderellaProject.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class CourseDto {

    /** Frontend-provided S. No. */
    @NotNull
    private Long sNo;

    @NotBlank
    private String code;

    @NotBlank
    private String title;

    @NotBlank
    private String level;

    /** Optional image file */
    private MultipartFile image;
}
