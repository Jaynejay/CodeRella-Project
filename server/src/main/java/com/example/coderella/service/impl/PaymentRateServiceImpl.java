package com.example.coderella.service.impl;

import com.example.coderella.dto.PaymentRateRequest;
import com.example.coderella.dto.PaymentRateResponse;
import com.example.coderella.entity.PaymentRate;
import com.example.coderella.repository.PaymentRateRepository;
import com.example.coderella.service.PaymentRateService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentRateServiceImpl implements PaymentRateService {

    private final PaymentRateRepository repository;

    @Override
    @Transactional
    public PaymentRateResponse createRate(PaymentRateRequest request) {
        if (repository.existsByCourseCodeAndSubjectCode(request.getCourseCode(), request.getSubjectCode())) {
            throw new IllegalArgumentException("Rate for given course and subject already exists.");
        }

        PaymentRate rate = mapToEntity(request);
        return mapToResponse(repository.save(rate));
    }

    @Override
    @Transactional
    public PaymentRateResponse updateRate(Long id, PaymentRateRequest request) {
        PaymentRate rate = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rate not found"));

        rate.setCourseCode(request.getCourseCode());
        rate.setCourseName(request.getCourseName());
        rate.setSubjectCode(request.getSubjectCode());
        rate.setSubjectName(request.getSubjectName());
        rate.setDuration(request.getDuration());
        rate.setRate(request.getRate());

        return mapToResponse(repository.save(rate));
    }

    @Override
    public void deleteRate(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Rate not found");
        }
        repository.deleteById(id);
    }

    @Override
    public List<PaymentRateResponse> getAllRates() {
        return repository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private PaymentRate mapToEntity(PaymentRateRequest req) {
        return PaymentRate.builder()
                .courseCode(req.getCourseCode())
                .courseName(req.getCourseName())
                .subjectCode(req.getSubjectCode())
                .subjectName(req.getSubjectName())
                .duration(req.getDuration())
                .rate(req.getRate())
                .build();
    }

    private PaymentRateResponse mapToResponse(PaymentRate entity) {
        return PaymentRateResponse.builder()
                .id(entity.getId())
                .courseCode(entity.getCourseCode())
                .courseName(entity.getCourseName())
                .subjectCode(entity.getSubjectCode())
                .subjectName(entity.getSubjectName())
                .duration(entity.getDuration())
                .rate(entity.getRate())
                .build();
    }
}
