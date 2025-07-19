package com.example.coderella.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoucherRequest {

    @NotBlank(message = "Registration ID is required")
    @Pattern(regexp = "^[A-Za-z0-9\\-]+$", message = "Registration ID must not contain special characters")
    private String registrationId;

    @NotBlank(message = "Exam name is required")
    @Size(max = 100)
    private String examName;

    @NotBlank(message = "Course code is required")
    @Pattern(regexp = "^[A-Za-z0-9\\-]+$", message = "Course code must not contain special characters")
    private String courseCode;

    @NotBlank(message = "Subject code is required")
    @Pattern(regexp = "^[A-Za-z0-9\\-]+$", message = "Subject code must not contain special characters")
    private String subjectCode;

    @Size(max = 500, message = "Message must be under 500 characters")
    private String message;

    @NotBlank(message = "SubmittedBy is required")
    private String submittedBy;

    @NotBlank(message = "UserId is required")
    private String userId;
}
