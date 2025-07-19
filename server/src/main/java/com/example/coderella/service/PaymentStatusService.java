package com.example.coderella.service;

import com.example.coderella.dto.PaymentStatusRequest;
import com.example.coderella.dto.PaymentStatusResponse;

import java.util.List;

public interface PaymentStatusService {
    PaymentStatusResponse create(PaymentStatusRequest request);
    PaymentStatusResponse update(Long id, PaymentStatusRequest request);
    void delete(Long id);
    List<PaymentStatusResponse> getAll();
    PaymentStatusResponse getById(Long id);
    List<PaymentStatusResponse> getByUserId(String userId);

}
