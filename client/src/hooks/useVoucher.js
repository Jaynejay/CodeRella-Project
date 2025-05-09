import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getVoucherData,
    submitVoucher,
    getPaymentRate,
} from "../services/voucherService";

// Fetch all vouchers
export const useVoucherData = () => {
    return useQuery({
        queryKey: ["vouchers"],
        queryFn: getVoucherData,
        staleTime: 1000 * 60 * 10,
        retry: 1,
    });
};

// Submit new voucher
export const useVoucherSubmit = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: submitVoucher,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vouchers"] });
        },
    });
};

// Search payment rate by course, subject, duration
export const usePaymentRateSearch = () => {
    return useMutation({
        mutationFn: getPaymentRate,
    });
};
