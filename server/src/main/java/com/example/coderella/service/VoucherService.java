package com.example.coderella.service;

import com.example.coderella.dto.VoucherRequest;
import com.example.coderella.dto.VoucherResponse;

import java.util.List;

public interface VoucherService {
    VoucherResponse submitVoucher(VoucherRequest request);
    List<VoucherResponse> getVouchersByUser(String userId);
    List<VoucherResponse> getAllVouchers();

    VoucherResponse approveVoucher(Long id);
    VoucherResponse rejectVoucher(Long id);
    VoucherResponse deleteVoucher(Long id);




    

}
