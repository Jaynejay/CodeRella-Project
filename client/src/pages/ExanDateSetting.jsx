/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ExamDateSettings() {
  const [dates, setDates] = useState({
    openDate: "",
    dueDate: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch existing dates if any
    const fetchDates = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/exam-dates");
        if (response.data) {
          setDates({
            openDate: response.data.openDate ? new Date(response.data.openDate).toISOString().slice(0, 16) : "",
            dueDate: response.data.dueDate ? new Date(response.data.dueDate).toISOString().slice(0, 16) : ""
          });
        }
      } catch (err) {
        console.error("Error fetching dates:", err);
      }
    };

    fetchDates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validate dates
    if (!dates.openDate || !dates.dueDate) {
      setError("Please set both open and due dates");
      return;
    }

    const openDateTime = new Date(dates.openDate);
    const dueDateTime = new Date(dates.dueDate);

    if (openDateTime >= dueDateTime) {
      setError("Due date must be after open date");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/exam-dates", {
        openDate: dates.openDate,
        dueDate: dates.dueDate
      });
      setMessage("Dates have been successfully set!");
    } catch (err) {
      setError("Failed to save dates. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Set Exam Dates</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="openDate" className="block text-sm font-medium text-gray-700 mb-1">
                Open Date and Time
              </label>
              <input
                type="datetime-local"
                id="openDate"
                value={dates.openDate}
                onChange={(e) => setDates({ ...dates, openDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date and Time
              </label>
              <input
                type="datetime-local"
                id="dueDate"
                value={dates.dueDate}
                onChange={(e) => setDates({ ...dates, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}

        {message && (
          <div className="text-green-500 text-center">{message}</div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow transition-colors duration-200"
          >
            Save Dates
          </button>
        </div>
      </form>
    </div>
  );
} 