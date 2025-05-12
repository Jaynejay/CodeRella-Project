import React, { useState } from "react";
import { Banknote, FileText, BarChart, ArrowLeft } from "lucide-react";
import RatesTab from "../payments/RatesTab"; // to be created
//import VoucherAdminTab from "../admin/VoucherAdminTab"; // next step
//import StatusTab from "../admin/StatusTab"; // later step
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const tabs = [
  { id: "rates", label: "Rates", icon: <Banknote size={18} /> },
  { id: "voucher", label: "Voucher", icon: <FileText size={18} /> },
  { id: "status", label: "Status", icon: <BarChart size={18} /> },
];

const AdminPaymentTabsLayout = () => {
  const [activeTab, setActiveTab] = useState("rates");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
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

        {/* Back Button */}
        <div className="pt-6 border-t">
          <button
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 px-4 md:px-8 py-6 overflow-hidden">
        {activeTab === "rates" && <RatesTab />}
        {activeTab === "voucher" && <VoucherAdminTab />}
        {activeTab === "status" && <StatusTab />}
      </main>
    </div>
  );
};

export default AdminPaymentTabsLayout;
