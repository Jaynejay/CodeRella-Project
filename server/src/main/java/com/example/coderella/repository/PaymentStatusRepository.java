package com.example.coderella.repository;

import com.example.coderella.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentStatusRepository extends JpaRepository<PaymentStatus, Long> {
    Optional<PaymentStatus> findByVoucherNumber(String voucherNumber);
    boolean existsByVoucherNumber(String voucherNumber);
}
