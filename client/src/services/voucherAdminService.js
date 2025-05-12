

let adminVouchers = [
  {
    id: "v001",
    name: "IMLokupathirage",
    userId: "12222234",
    voucherNo: "12222234",
    course: "Motorcycle Mechanic",
    subject: "Technical Drawing",
    exam: "NVQ Level 4 End Exam",
    rate: 300,
    submittedAt: "2024-05-01",
    status: "Pending",
    bankDetails: {
      accountName: "IMLokupathirage",
      accountNumber: "1000156789900",
      bankName: "NSB",
      branch: "Moratuwa",
    },
  },
];

export const fetchAdminVouchers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(adminVouchers), 600);
  });
};

export const approveVoucher = async (voucherId) => {
  adminVouchers = adminVouchers.map((v) =>
    v.id === voucherId ? { ...v, status: "Approved" } : v
  );
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 400);
  });
};

export const rejectVoucher = async (voucherId) => {
  adminVouchers = adminVouchers.map((v) =>
    v.id === voucherId ? { ...v, status: "Rejected" } : v
  );
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 400);
  });
};

export const deleteVoucher = async (voucherId) => {
  adminVouchers = adminVouchers.filter((v) => v.id !== voucherId);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 400);
  });
};
