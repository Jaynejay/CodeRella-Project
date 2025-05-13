import api from "./api"; // axios instance

// Dummy fallback data
const dummyAccountData = {
  balance: 8453,
  pending: 526,
  bankDetails: {
    accountName: "IMLokupathirage",
    accountNumber: "1000156789900",
    bankName: "NSB",
    branch: "Moratuwa",
  },
  history: [
    {
      paper: "Paper 1",
      voucher: "Voucher No 1",
      status: "Pending",
      date: "2024-12-01",
    },
    {
      paper: "Paper 2",
      voucher: "Voucher No 1",
      status: "Paid",
      date: "2024-11-25",
    },
    {
      paper: "Paper 3",
      voucher: "Voucher No 1",
      status: "Paid",
      date: "2024-11-20",
    },
    {
      paper: "Paper 4",
      voucher: "Voucher No 1",
      status: "Paid",
      date: "2024-11-15",
    },
    {
      paper: "Paper 5",
      voucher: "Voucher No 1",
      status: "Paid",
      date: "2024-11-10",
    },
    {
      paper: "Paper 6",
      voucher: "Voucher No 1",
      status: "Cancelled",
      date: "2024-11-05",
    },
    {
      paper: "Paper 7",
      voucher: "Voucher No 1",
      status: "Paid",
      date: "2024-11-01",
    },
    {
      paper: "Paper 8",
      voucher: "Voucher No 1",
      status: "Paid",
      date: "2024-10-28",
    },
    {
      paper: "Paper 9",
      voucher: "Voucher No 1",
      status: "Paid",
      date: "2024-10-25",
    },
    {
      paper: "Paper 10",
      voucher: "Voucher No 1",
      status: "Paid",
      date: "2024-10-20",
    },
  ],
};

// GET: /api/user/account
export const getAccountData = async () => {
  try {
    // Uncomment below line when backend is ready
    // const response = await api.get("/user/account");
    // return response.data;

    // Dummy fallback
    return new Promise((resolve) =>
      setTimeout(() => resolve(dummyAccountData), 1000)
    );
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to load account data.";
    throw new Error(message);
  }
};

// POST: /api/user/account/feedback
export const submitAccountFeedback = async (payload) => {
  try {
    // Uncomment below line when backend is ready
    // const response = await api.post("/user/account/feedback", payload);
    // return response.data;

    // Dummy fallback
    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 500)
    );
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to submit feedback.";
    throw new Error(message);
  }
};
