package com.example.coderella.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.util.List;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AnnouncementDto {
    @NotBlank private String author;
    @NotBlank private String title;
    @NotBlank private String message;
    @NotBlank private List<String> recipientUsernames;
}