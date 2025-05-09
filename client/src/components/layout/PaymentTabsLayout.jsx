import React, { useState } from "react";
import clsx from "clsx";
import AccountTab from "../payments/AccountTab";
import VoucherTab from "../payments/VoucherTab";
import { Banknote, FileText, ArrowLeft } from "lucide-react";

const tabs = [
    { id: "account", label: "Account", icon: <Banknote size={18} /> },
    { id: "voucher", label: "Voucher", icon: <FileText size={18} /> },
];

const PaymentTabsLayout = () => {
    const [activeTab, setActiveTab] = useState("account");

    return (
        <div className="flex min-h-screen bg-gray-100 pt-24">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between rounded-r-2xl">
                <div>
                    <h2 className="text-xl font-bold mb-6">Payments</h2>
                    <ul className="space-y-2">
                        {tabs.map((tab) => (
                            <li
                                key={tab.id}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition",
                                    activeTab === tab.id
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.icon}
                                <span className="font-medium">{tab.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom link */}
                <div className="pt-6 border-t">
                    <button
                        onClick={() => window.location.href = '/dashboard'}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 px-2 md:px-6 py-4 overflow-hidden">
                {activeTab === "account" && <AccountTab />}
                {activeTab === "voucher" && <VoucherTab />}
            </main>
        </div>
    );
};

export default PaymentTabsLayout;
