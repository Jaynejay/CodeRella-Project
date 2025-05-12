import { useQuery } from "@tanstack/react-query";
import { fetchUserNotifications } from "../services/userNotificationService";

export const useUserNotifications = () => {
  return useQuery({
    queryKey: ["userNotifications"],
    queryFn: fetchUserNotifications,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};
