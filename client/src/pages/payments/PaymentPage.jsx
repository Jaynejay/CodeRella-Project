import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import PaymentTabsLayout from "../../components/layout/PaymentTabsLayout";
import Navbar from "../../components/layout/Navbar.jsx"

// Create a single query client instance
const queryClient = new QueryClient();

const Payments = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster position="bottom-right" />
            <Navbar/>
            <PaymentTabsLayout />

        </QueryClientProvider>
    );
};

export default Payments;
