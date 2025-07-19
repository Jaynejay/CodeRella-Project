package com.example.coderella.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRateResponse {
    private Long id;
    private String courseCode;
    private String courseName;
    private String subjectCode;
    private String subjectName;
    private Integer duration;
    private BigDecimal rate;
}
