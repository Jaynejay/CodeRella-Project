package com.example.coderella.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.coderella.dto.PaymentStatusRequest;
import com.example.coderella.dto.PaymentStatusResponse;
import com.example.coderella.entity.PaymentStatus;
import com.example.coderella.entity.Voucher;
import com.example.coderella.repository.PaymentStatusRepository;
import com.example.coderella.repository.VoucherRepository;
import com.example.coderella.service.NotificationService;
import com.example.coderella.service.PaymentStatusService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentStatusServiceImpl implements PaymentStatusService {

    private final PaymentStatusRepository paymentStatusRepository;
    private final VoucherRepository voucherRepository;
    private final NotificationService notificationService;

    @Override
    @Transactional
    public PaymentStatusResponse create(PaymentStatusRequest req) {
        Voucher voucher = voucherRepository.findByVoucherNumber(req.getVoucherNumber())
                .orElseThrow(() -> new EntityNotFoundException("Voucher not found for this number."));

        PaymentStatus status = PaymentStatus.builder()
                .voucherNumber(req.getVoucherNumber())
                .userId(req.getUserId())
                .username(req.getUsername())
                .amount(req.getAmount())
                .date(req.getDate())
                .status(req.getStatus().toUpperCase())
                .build();

        adjustUserBalance(voucher.getUserId(), req.getAmount(), req.getStatus(), null);
        sendStatusNotification(voucher.getSubmittedBy(), req.getVoucherNumber(), req.getStatus());

        return mapToResponse(paymentStatusRepository.save(status));
    }

    @Override
    @Transactional
    public PaymentStatusResponse update(Long id, PaymentStatusRequest req) {
        PaymentStatus existing = paymentStatusRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Payment record not found"));

        // Reverse old balance effect
        adjustUserBalance(existing.getUserId(), existing.getAmount(), null, existing.getStatus());

        // Apply new balance
        adjustUserBalance(req.getUserId(), req.getAmount(), req.getStatus(), null);

        existing.setUserId(req.getUserId());
        existing.setUsername(req.getUsername());
        existing.setVoucherNumber(req.getVoucherNumber());
        existing.setAmount(req.getAmount());
        existing.setDate(req.getDate());
        existing.setStatus(req.getStatus().toUpperCase());

        sendStatusNotification(existing.getUsername(), req.getVoucherNumber(), req.getStatus());

        return mapToResponse(paymentStatusRepository.save(existing));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PaymentStatus existing = paymentStatusRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Payment record not found"));

        adjustUserBalance(existing.getUserId(), existing.getAmount(), null, existing.getStatus());
        paymentStatusRepository.deleteById(id);
    }

    @Override
    public List<PaymentStatusResponse> getAll() {
        return paymentStatusRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentStatusResponse getById(Long id) {
        return paymentStatusRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new EntityNotFoundException("Payment not found"));
    }

    private PaymentStatusResponse mapToResponse(PaymentStatus p) {
        return PaymentStatusResponse.builder()
                .id(p.getId())
                .voucherNumber(p.getVoucherNumber())
                .userId(p.getUserId())
                .username(p.getUsername())
                .amount(p.getAmount())
                .date(p.getDate())
                .status(p.getStatus())
                .build();
    }

    // 🔁 Fake balance tracking for now (we'll wire user balance tracking separately)
    private void adjustUserBalance(String userId, BigDecimal amount, String newStatus, String oldStatus) {
        // Simulate balance state tracking (replace this logic with actual UserService or DB logic)
        if (oldStatus != null) {
            if (oldStatus.equalsIgnoreCase("PENDING")) {
                System.out.println("⏪ Reversing pending for user: " + userId + " amount: " + amount);
            } else if (oldStatus.equalsIgnoreCase("PAID")) {
                System.out.println("⏪ Reversing paid for user: " + userId + " amount: " + amount);
            }
        }

        if (newStatus != null) {
            if (newStatus.equalsIgnoreCase("PENDING")) {
                System.out.println("➕ Added to pending balance for user: " + userId + " amount: " + amount);
            } else if (newStatus.equalsIgnoreCase("PAID")) {
                System.out.println("✅ Added to total paid for user: " + userId + " amount: " + amount);
            }
        }
    }

    private void sendStatusNotification(String username, String voucherNo, String status) {
        String msg = switch (status.toUpperCase()) {
            case "PAID" -> "✅ Your voucher " + voucherNo + " has been marked as PAID.";
            case "PENDING" -> "⏳ Your voucher " + voucherNo + " is pending. You will be paid soon.";
            case "CANCELLED" -> "❌ Your voucher " + voucherNo + " has been CANCELLED.";
            default -> "ℹ️ Status of your voucher " + voucherNo + " updated to: " + status;
        };

        // Replace "user-token-here" with actual logic to get FCM token from DB
        notificationService.sendNotification("user-token-here", "Payment Update", msg);
    }

    @Override
    public List<PaymentStatusResponse> getByUserId(String userId) {
        return paymentStatusRepository.findAll().stream()
                .filter(p -> p.getUserId().equalsIgnoreCase(userId))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
}
