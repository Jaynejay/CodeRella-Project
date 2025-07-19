// --- ChangePasswordPage.jsx ---
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const navigate = useNavigate();

  // Handle changes in input fields and update form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      // Send password reset request to backend
      await axios.put("/user/reset-password", null, {
        params: {
          currentPassword: form.currentPassword, // ✅ add this
          newPassword: form.newPassword,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"), // Passing JWT token for authentication
        },
      });

      alert("Password changed successfully. Please login again.");
      localStorage.clear(); // Clear localStorage to force re-authentication
      navigate("/");
    } catch (err) {
      alert(
        "Failed to change password: " + (err?.response?.data || err.message)
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
