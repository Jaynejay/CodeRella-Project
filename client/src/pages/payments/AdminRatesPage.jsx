import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AdminPaymentTabsLayout from "../../components/layout/AdminPaymentTabsLayout"
import Navbar from "../../components/layout/Navbar.jsx";

const queryClient = new QueryClient();

const AdminRatesPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" />
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 pt-24">
        <AdminPaymentTabsLayout />
      </div>
    </QueryClientProvider>
  );
};

export default AdminRatesPage;
