import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAccountData,
    submitAccountFeedback,
} from "../services/accountService";

// ✅ v5-compliant Query
export const useAccountData = () => {
    return useQuery({
        queryKey: ["accountData"],
        queryFn: getAccountData,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};

export const useSubmitFeedback = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: submitAccountFeedback,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accountData"] });
        },
    });
};
