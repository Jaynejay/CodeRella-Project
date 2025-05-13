package com.example.coderella.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentStatusResponse {

    private Long id;
    private String voucherNumber;
    private String userId;
    private String username;
    private BigDecimal amount;
    private LocalDate date;
    private String status;
}
