/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function AddSubmissionPage() {
  const navigate = useNavigate();
  const [submissionDetails, setSubmissionDetails] = useState(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem('submissionDetails');
    if (storedDetails) {
      setSubmissionDetails(JSON.parse(storedDetails));
    }
  }, []);

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
            <span className="font-bold">Due Date</span>  : Tuesday, 21 January 2025, 11:59 PM
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-md shadow border p-5 text-left">
            <span className="font-bold text-lg">Submission Status : </span>
            <span className={submissionDetails ? "text-green-600" : "text-gray-600"}>
              {submissionDetails?.status || 'Not Submitted'}
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
            <span>
              {submissionDetails?.lastModified 
                ? new Date(submissionDetails.lastModified).toLocaleString() 
                : 'No submission yet'}
            </span>
          </div>
          <div className="bg-white rounded-md shadow border p-5 text-left">
            <span className="font-bold">File Name : </span>
            <span>{submissionDetails?.fileName || 'No file uploaded'}</span>
          </div>
          <div className="bg-white rounded-md shadow border p-5 text-left">
            <span className="font-bold">Submission Comment : </span>
            <span>{submissionDetails?.comment || 'No comment'}</span>
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