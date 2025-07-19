package com.example.coderella.controller;

import com.example.coderella.dto.ApiResponse;
import com.example.coderella.dto.PaymentStatusRequest;
import com.example.coderella.dto.PaymentStatusResponse;
import com.example.coderella.service.PaymentStatusService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payments/status")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentStatusController {

    private final PaymentStatusService paymentStatusService;

    @PostMapping
    public ResponseEntity<ApiResponse<PaymentStatusResponse>> create(@Valid @RequestBody PaymentStatusRequest request) {
        PaymentStatusResponse response = paymentStatusService.create(request);
        return ResponseEntity.ok(
                ApiResponse.<PaymentStatusResponse>builder()
                        .status(200)
                        .message("Payment status created")
                        .data(response)
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PaymentStatusResponse>> update(@PathVariable Long id,
                                                                      @Valid @RequestBody PaymentStatusRequest request) {
        PaymentStatusResponse response = paymentStatusService.update(id, request);
        return ResponseEntity.ok(
                ApiResponse.<PaymentStatusResponse>builder()
                        .status(200)
                        .message("Payment status updated")
                        .data(response)
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        paymentStatusService.delete(id);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .status(200)
                        .message("Payment status deleted")
                        .data(null)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<List<PaymentStatusResponse>> getAll() {
        return ResponseEntity.ok(paymentStatusService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentStatusResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentStatusService.getById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentStatusResponse>> getByUser(@PathVariable String userId) {
        return ResponseEntity.ok(paymentStatusService.getByUserId(userId));
    }

}
