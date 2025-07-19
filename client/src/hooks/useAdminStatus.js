import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminStatuses,
  saveStatus,
  deleteStatus,
} from "../services/adminStatusService";

export const useAdminStatuses = () => {
  return useQuery({
    queryKey: ["adminStatuses"],
    queryFn: fetchAdminStatuses,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSaveStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminStatuses"] });
    },
  });
};

export const useDeleteStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminStatuses"] });
    },
  });
};
