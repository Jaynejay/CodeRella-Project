package com.example.coderella.controller;

import com.example.coderella.dto.ApiResponse;
import com.example.coderella.dto.VoucherRequest;
import com.example.coderella.dto.VoucherResponse;
import com.example.coderella.service.VoucherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/vouchers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VoucherController {

    private final VoucherService voucherService;

    @PostMapping
    public ResponseEntity<ApiResponse<VoucherResponse>> submitVoucher(@Valid @RequestBody VoucherRequest request) {
        VoucherResponse response = voucherService.submitVoucher(request);
        return ResponseEntity.ok(
                ApiResponse.<VoucherResponse>builder()
                        .status(200)
                        .message("Voucher submitted successfully")
                        .data(response)
                        .build()
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<VoucherResponse>>> getVouchersByUser(@PathVariable String userId) {
        List<VoucherResponse> responses = voucherService.getVouchersByUser(userId);
        return ResponseEntity.ok(
                ApiResponse.<List<VoucherResponse>>builder()
                        .status(200)
                        .message("User vouchers fetched successfully")
                        .data(responses)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<VoucherResponse>>> getAllVouchers() {
        List<VoucherResponse> responses = voucherService.getAllVouchers();
        return ResponseEntity.ok(
                ApiResponse.<List<VoucherResponse>>builder()
                        .status(200)
                        .message("All vouchers fetched successfully")
                        .data(responses)
                        .build()
        );
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<ApiResponse<VoucherResponse>> approveVoucher(@PathVariable Long id) {
        VoucherResponse response = voucherService.approveVoucher(id); 
        return ResponseEntity.ok(
                ApiResponse.<VoucherResponse>builder()
                        .status(200)
                        .message("Voucher approved successfully")
                        .data(response) 
                        .build()
        );
    }
    

    @PutMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<VoucherResponse>> rejectVoucher(@PathVariable Long id) {
    VoucherResponse response = voucherService.rejectVoucher(id); 
    return ResponseEntity.ok(
            ApiResponse.<VoucherResponse>builder()
                    .status(200)
                    .message("Voucher rejected successfully")
                    .data(response) 
                    .build()
    );
}

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<VoucherResponse>> deleteVoucher(@PathVariable Long id) {
        VoucherResponse response = voucherService.deleteVoucher(id);
        return ResponseEntity.ok(
                ApiResponse.<VoucherResponse>builder()
                        .status(200)
                        .message("Voucher deleted successfully")
                        .data(response) 
                        .build()
        );
    }




}
