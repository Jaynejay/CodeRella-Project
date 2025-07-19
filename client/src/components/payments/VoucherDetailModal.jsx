import { useState } from "react";
import { X } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const VoucherDetailModal = ({ data, onClose }) => {
  const [amount, setAmount] = useState(data.rate || 0);
  const [error, setError] = useState("");

  const downloadPdf = () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid positive amount.");
      return;
    }

    setError("");
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleString();

    doc.setFontSize(16);
    doc.text("Voucher Summary", 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 14, 26);
    doc.text(
      "This document was generated automatically by the payment system.",
      14,
      32
    );

    doc.text(`Name: ${data.name}`, 14, 40);
    doc.text(`User ID: ${data.userId}`, 14, 46);
    doc.text(`Voucher No: ${data.voucherNo}`, 14, 52);

    autoTable(doc, {
      startY: 60,
      head: [["Exam", "Course", "Subject", "Rate (Rs.)"]],
      body: [[data.exam, data.course, data.subject, amount.toFixed(2)]],
      styles: {
        halign: "left",
        valign: "middle",
        lineColor: [220, 220, 220],
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [41, 98, 255],
        textColor: 255,
        fontSize: 10,
      },
      bodyStyles: {
        fontSize: 10,
      },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Account Name", "Account Number", "Bank Name", "Branch"]],
      body: [
        [
          data.bankDetails.accountName,
          data.bankDetails.accountNumber,
          data.bankDetails.bankName,
          data.bankDetails.branch,
        ],
      ],
      headStyles: {
        fillColor: [13, 110, 253],
        textColor: 255,
        fontSize: 10,
      },
      styles: {
        fontSize: 10,
      },
    });

    doc.setFontSize(12);
    doc.text(
      `Total: Rs. ${amount.toFixed(2)}`,
      14,
      doc.lastAutoTable.finalY + 20
    );

    doc.save(`Voucher-${data.voucherNo}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Voucher</h2>

        <div className="grid grid-cols-2 text-sm gap-2 mb-4">
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>User ID:</strong> {data.userId}
          </p>
          <p>
            <strong>Voucher No:</strong> {data.voucherNo}
          </p>
          <p>
            <strong>Exam:</strong> {data.exam}
          </p>
          <p>
            <strong>Course:</strong> {data.course}
          </p>
          <p>
            <strong>Subject:</strong> {data.subject}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Amount (Rs.)</label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>

        <h3 className="text-md font-semibold mt-4 mb-2">Bank Details</h3>
        <div className="grid grid-cols-2 text-sm gap-2">
          <p>
            <strong>Account Name:</strong> {data.bankDetails.accountName}
          </p>
          <p>
            <strong>Account Number:</strong> {data.bankDetails.accountNumber}
          </p>
          <p>
            <strong>Bank Name:</strong> {data.bankDetails.bankName}
          </p>
          <p>
            <strong>Branch:</strong> {data.bankDetails.branch}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={downloadPdf}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherDetailModal;
