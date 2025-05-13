package com.example.coderella.service.impl;

import com.example.coderella.dto.VoucherRequest;
import com.example.coderella.dto.VoucherResponse;
import com.example.coderella.entity.Voucher;
import com.example.coderella.repository.VoucherRepository;
import com.example.coderella.service.VoucherService;
import com.example.coderella.util.VoucherUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoucherServiceImpl implements VoucherService {

    private final VoucherRepository repository;

    @Override
    @Transactional
    public VoucherResponse submitVoucher(VoucherRequest request) {
        String voucherNumber = generateUniqueVoucherNumber();

        Voucher voucher = Voucher.builder()
                .voucherNumber(voucherNumber)
                .registrationId(request.getRegistrationId())
                .examName(request.getExamName())
                .courseCode(request.getCourseCode())
                .subjectCode(request.getSubjectCode())
                .message(request.getMessage())
                .status("PENDING")
                .submittedBy(request.getSubmittedBy())
                .userId(request.getUserId())
                .build();

        return mapToResponse(repository.save(voucher));
    }

    @Override
    public List<VoucherResponse> getVouchersByUser(String userId) {
        return repository.findAll().stream()
                .filter(v -> v.getUserId().equals(userId))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<VoucherResponse> getAllVouchers() {
        return repository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private VoucherResponse mapToResponse(Voucher v) {
        return VoucherResponse.builder()
                .id(v.getId())
                .voucherNumber(v.getVoucherNumber())
                .registrationId(v.getRegistrationId())
                .examName(v.getExamName())
                .courseCode(v.getCourseCode())
                .subjectCode(v.getSubjectCode())
                .message(v.getMessage())
                .status(v.getStatus())
                .submittedBy(v.getSubmittedBy())
                .userId(v.getUserId())
                .submittedAt(v.getSubmittedAt())
                .approvedAt(v.getApprovedAt())
                .build();
    }

    private String generateUniqueVoucherNumber() {
        String voucherNumber;
        do {
            voucherNumber = VoucherUtils.generateVoucherNumber();
        } while (repository.findByVoucherNumber(voucherNumber).isPresent());
        return voucherNumber;
    }
}
