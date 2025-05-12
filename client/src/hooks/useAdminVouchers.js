
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminVouchers,
  approveVoucher,
  rejectVoucher,
  deleteVoucher,
} from "../services/voucherAdminService";

export const useAdminVouchers = () => {
  return useQuery({
    queryKey: ["adminVouchers"],
    queryFn: fetchAdminVouchers,
    staleTime: 1000 * 60 * 5,
  });
};

export const useApproveVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveVoucher,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminVouchers"] }),
  });
};

export const useRejectVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectVoucher,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminVouchers"] }),
  });
};

export const useDeleteVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVoucher,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["adminVouchers"] }),
  });
};
