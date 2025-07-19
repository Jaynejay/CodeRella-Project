package com.example.coderella.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentStatusRequest {

    @NotBlank(message = "Voucher number is required")
    private String voucherNumber;

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Username is required")
    private String username;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "1.0", inclusive = true, message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotBlank(message = "Status is required")
    private String status; // REQUESTED, PENDING, PAID, CANCELLED
}
