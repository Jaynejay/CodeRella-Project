import api from "./api";

// Dummy in-memory DB
let statuses = [
  {
    id: 1,
    userId: "U1001",
    username: "IMLokupathirage",
    voucherNo: "V123456",
    amount: 300,
    date: "2025-05-01",
    status: "Requested",
  },
  {
    id: 2,
    userId: "U1002",
    username: "KasunPerera",
    voucherNo: "V123457",
    amount: 600,
    date: "2025-05-10",
    status: "Pending",
  },
];

// Simulate API: GET
export const fetchAdminStatuses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(statuses), 800);
  });
};

// Simulate API: POST or PUT
export const saveStatus = async (payload) => {
  if (payload.id) {
    statuses = statuses.map((s) =>
      s.id === payload.id ? { ...s, ...payload } : s
    );
  } else {
    statuses.push({ ...payload, id: Date.now() });
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
};

// Simulate API: DELETE
export const deleteStatus = async (id) => {
  statuses = statuses.filter((s) => s.id !== id);

  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 500);
  });
};
