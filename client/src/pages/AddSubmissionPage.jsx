/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function AddSubmissionPage() {
  const navigate = useNavigate();

  // Hardcoded submission data
  const submissionDetails = {
    status: "Submitted",
    lastModified: "2025-01-10T15:45:00Z",
    fileName: "Assignment1_Solution.pdf",
    comment: "Final version submitted."
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Submission</h1>
        <div className="mb-6 text-base text-gray-700 text-left">
          <div>
            <span className="font-bold">Open Date</span> : Saturday, 21 December 2025, 12:00 AM
          </div>
          <div>
            <span className="font-bold">Due Date</span> : Tuesday, 21 January 2025, 11:59 PM
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-md shadow border p-5 text-left">
            <span className="font-bold text-lg">Submission Status : </span>
            <span className="text-green-600">
              {submissionDetails.status}
            </span>
          </div>

          <div className="bg-white rounded-md shadow border p-5 flex items-center gap-4 text-left">
            <span className="font-bold min-w-[120px]">Open Date :</span>
            <span>Saturday, 21 December 2024, 12:00 AM</span>
          </div>

          <div className="bg-white rounded-md shadow border p-5 flex items-center gap-4 text-left">
            <span className="font-bold min-w-[120px]">Due Date :</span>
            <span>Tuesday, 21 January 2024, 11:59 PM</span>
          </div>

          <div className="bg-white rounded-md shadow border p-5 text-left">
            <span className="font-bold">Last Modified : </span>
            <span>{new Date(submissionDetails.lastModified).toLocaleString()}</span>
          </div>

          <div className="bg-white rounded-md shadow border p-5 text-left">
            <span className="font-bold">File Name : </span>
            <span>{submissionDetails.fileName}</span>
          </div>

          <div className="bg-white rounded-md shadow border p-5 text-left">
            <span className="font-bold">Submission Comment : </span>
            <span>{submissionDetails.comment}</span>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded shadow text-base font-semibold transition-colors duration-200"
            onClick={() => navigate("/upload")}
          >
            Add Submission
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
