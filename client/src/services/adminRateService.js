// Simulated backend
let paymentRates = [
  {
    id: "r001",
    courseCode: "GS05006F3.3",
    course: "Motorcycle Mechanic",
    subjectCode: "11111111",
    subject: "Technical Drawing",
    duration: 3,
    rate: 300,
  },
  {
    id: "r002",
    courseCode: "GS05008F3.2",
    course: "Welding",
    subjectCode: "22222222",
    subject: "Metal Work",
    duration: 2,
    rate: 250,
  },
];

export const fetchRates = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(paymentRates), 800);
  });
};

export const addRate = async (newRate) => {
  const rateWithId = { ...newRate, id: crypto.randomUUID() };
  paymentRates.push(rateWithId);
  return new Promise((resolve) => {
    setTimeout(() => resolve(rateWithId), 400);
  });
};

export const updateRate = async (updatedRate) => {
  paymentRates = paymentRates.map((rate) =>
    rate.id === updatedRate.id ? updatedRate : rate
  );
  return new Promise((resolve) => {
    setTimeout(() => resolve(updatedRate), 400);
  });
};

export const deleteRate = async (id) => {
  paymentRates = paymentRates.filter((rate) => rate.id !== id);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 400);
  });
};
