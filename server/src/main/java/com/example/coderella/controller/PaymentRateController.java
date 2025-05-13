package com.example.coderella.controller;

import com.example.coderella.dto.ApiResponse;
import com.example.coderella.dto.PaymentRateRequest;
import com.example.coderella.dto.PaymentRateResponse;
import com.example.coderella.service.PaymentRateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rates")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // adjust as needed
public class PaymentRateController {

    private final PaymentRateService paymentRateService;

    @PostMapping
    public ResponseEntity<ApiResponse<PaymentRateResponse>> createRate(@Valid @RequestBody PaymentRateRequest request) {
        PaymentRateResponse response = paymentRateService.createRate(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                ApiResponse.<PaymentRateResponse>builder()
                        .status(201)
                        .message("Rate created successfully")
                        .data(response)
                        .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<PaymentRateResponse>> updateRate(@PathVariable Long id,
                                                                        @Valid @RequestBody PaymentRateRequest request) {
        PaymentRateResponse response = paymentRateService.updateRate(id, request);
        return ResponseEntity.ok(
                ApiResponse.<PaymentRateResponse>builder()
                        .status(200)
                        .message("Rate updated successfully")
                        .data(response)
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteRate(@PathVariable Long id) {
        paymentRateService.deleteRate(id);
        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .status(200)
                        .message("Rate deleted successfully")
                        .data(null)
                        .build()
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PaymentRateResponse>>> getAllRates() {
        List<PaymentRateResponse> rates = paymentRateService.getAllRates();
        return ResponseEntity.ok(
                ApiResponse.<List<PaymentRateResponse>>builder()
                        .status(200)
                        .message("Rates fetched successfully")
                        .data(rates)
                        .build()
        );
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PaymentRateResponse>> searchRate(
        @RequestParam String courseCode,
        @RequestParam String subjectCode,
        @RequestParam Integer duration) {

    PaymentRateResponse result = paymentRateService.findRateBySearch(courseCode, subjectCode, duration);
    return ResponseEntity.ok(
            ApiResponse.<PaymentRateResponse>builder()
                    .status(200)
                    .message("Rate fetched successfully")
                    .data(result)
                    .build()
    );
}

    @GetMapping("/course-codes")
    public ResponseEntity<ApiResponse<List<String>>> getCourseCodes() {
        return ResponseEntity.ok(
                ApiResponse.<List<String>>builder()
                        .status(200)
                        .message("Course codes fetched successfully")
                        .data(paymentRateService.getDistinctCourseCodes())
                        .build()
        );
    }

    @GetMapping("/subject-codes")
    public ResponseEntity<ApiResponse<List<String>>> getSubjectCodes() {
        return ResponseEntity.ok(
                ApiResponse.<List<String>>builder()
                        .status(200)
                        .message("Subject codes fetched successfully")
                        .data(paymentRateService.getDistinctSubjectCodes())
                        .build()
        );
    }

    @GetMapping("/durations")
    public ResponseEntity<ApiResponse<List<Integer>>> getDurations() {
        return ResponseEntity.ok(
                ApiResponse.<List<Integer>>builder()
                        .status(200)
                        .message("Durations fetched successfully")
                        .data(paymentRateService.getDistinctDurations())
                        .build()
        );
    }


}
