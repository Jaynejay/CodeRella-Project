import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchRates,
  addRate,
  updateRate,
  deleteRate,
} from "../services/adminRateService";

// Fetch all rates
export const useAdminRates = () =>
  useQuery({
    queryKey: ["adminRates"],
    queryFn: fetchRates,
    staleTime: 1000 * 60 * 5,
  });

// Add new rate
export const useAddRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminRates"] });
    },
  });
};

// Update rate
export const useUpdateRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminRates"] });
    },
  });
};

// Delete rate
export const useDeleteRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminRates"] });
    },
  });
};
