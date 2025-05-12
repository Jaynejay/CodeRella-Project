import api from "./api";

// Simulated notifications DB
let mockNotifications = [
  {
    id: 1,
    message: "Your voucher #V123456 has been approved.",
    timestamp: "2 hrs ago",
  },
  {
    id: 2,
    message: "New course added: Digital Photography.",
    timestamp: "Yesterday",
  },
];

export const fetchUserNotifications = async () => {
  // Replace with: await api.get("/user/notifications");
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNotifications), 500);
  });
};
