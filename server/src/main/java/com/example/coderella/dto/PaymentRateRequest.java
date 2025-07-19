package com.example.coderella.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRateRequest {

    @NotBlank(message = "Course code is required")
    @Pattern(regexp = "^[A-Za-z0-9.\\-\\s]+$", message = "Course code must not contain special characters")
    @Size(max = 100)
    private String courseCode;

    @NotBlank(message = "Course name is required")
    @Size(max = 150)
    private String courseName;

    @NotBlank(message = "Subject code is required")
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "Subject code must not contain special characters")
    @Size(max = 100)
    private String subjectCode;

    @NotBlank(message = "Subject name is required")
    @Size(max = 150)
    private String subjectName;

    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be greater than 0")
    private Integer duration;

    @NotNull(message = "Rate is required")
    @DecimalMin(value = "1.0", message = "Rate must be greater than 0")
    private BigDecimal rate;
}
