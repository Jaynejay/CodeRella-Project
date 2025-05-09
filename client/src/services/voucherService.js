import api from "./api";

// Fake in-memory submitted vouchers
let submittedVouchers = [
    {
        registrationId: "REG123",
        examName: "Final Exam",
        courseCode: "C101",
        subjectCode: "S201",
        message: "Urgent request for voucher.",
        status: "Pending",
    },
    {
        registrationId: "REG456",
        examName: "Midterm",
        courseCode: "C102",
        subjectCode: "S202",
        message: "Submitted late.",
        status: "Approved",
    },
];

// Dummy payment rates
const paymentRates = [
    {
        courseCode: "C101",
        subjectCode: "S201",
        duration: "2",
        rate: "Rs. 2500",
        note: "Standard rate for 2-hour paper",
    },
    {
        courseCode: "C101",
        subjectCode: "S201",
        duration: "3",
        rate: "Rs. 3000",
        note: "Extended paper rate",
    },
    {
        courseCode: "C102",
        subjectCode: "S202",
        duration: "2",
        rate: "Rs. 2800",
        note: "Practical module rate",
    },
];

// GET submitted vouchers
export const getVoucherData = async () => {
    try {
        // const response = await api.get("/user/vouchers");
        // return response.data;

        return new Promise((resolve) =>
            setTimeout(() => resolve(submittedVouchers), 800)
        );
    } catch (error) {
        const message =
            error.response?.data?.message || "Failed to load voucher data.";
        throw new Error(message);
    }
};

// POST new voucher
export const submitVoucher = async (payload) => {
    try {
        // const response = await api.post("/user/vouchers", payload);
        // return response.data;

        const newVoucher = { ...payload, status: "Pending" };
        submittedVouchers.push(newVoucher);

        return new Promise((resolve) =>
            setTimeout(() => resolve({ success: true }), 500)
        );
    } catch (error) {
        const message =
            error.response?.data?.message || "Failed to submit voucher.";
        throw new Error(message);
    }
};

// GET payment rate by course, subject, duration
export const getPaymentRate = async ({ courseCode, subjectCode, duration }) => {
    try {
        const matched = paymentRates.find(
            (rate) =>
                rate.courseCode === courseCode &&
                rate.subjectCode === subjectCode &&
                rate.duration === duration
        );

        return new Promise((resolve) =>
            setTimeout(() => resolve(matched || null), 600)
        );
    } catch (error) {
        const message =
            error.response?.data?.message || "Failed to fetch payment rate.";
        throw new Error(message);
    }
};
