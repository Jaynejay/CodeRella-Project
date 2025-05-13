package com.example.coderella.service;

import com.example.coderella.dto.PaymentRateRequest;
import com.example.coderella.dto.PaymentRateResponse;

import java.util.List;

public interface PaymentRateService {
    PaymentRateResponse createRate(PaymentRateRequest request);
    PaymentRateResponse updateRate(Long id, PaymentRateRequest request);
    void deleteRate(Long id);
    List<PaymentRateResponse> getAllRates();
}
