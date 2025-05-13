package com.example.coderella.repository;

import com.example.coderella.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    Optional<Voucher> findByVoucherNumber(String voucherNumber);
}
