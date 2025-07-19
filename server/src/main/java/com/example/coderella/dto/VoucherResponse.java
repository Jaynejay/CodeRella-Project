package com.example.coderella.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoucherResponse {
    private Long id;
    private String voucherNumber;
    private String registrationId;
    private String examName;
    private String courseCode;
    private String subjectCode;
    private String message;
    private String status;
    private String submittedBy;
    private String userId;
    private LocalDateTime submittedAt;
    private LocalDateTime approvedAt;
}
