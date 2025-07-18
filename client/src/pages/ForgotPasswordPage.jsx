// pages/ForgotPasswordPage.jsx
import { useState } from "react";
import axios from "../axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/logo.svg";
import students from "../assets/images/bg.svg";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleRequest = async () => {
    if (!email) {
      toast.warning("Please enter your email.");
      return;
    }

    try {
      const res = await axios.post("/auth/request-password-reset", null, {
        params: { email },
      });

      toast.success(res.data || "Reset link sent to your email.");
    } catch (err) {
      toast.error(err.response?.data || "Failed to send reset link.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side: form */}
          <div className="w-full md:w-5/12 p-8 flex flex-col">
            {/* DTET Logo */}
            <div className="flex items-center mb-6">
              <img src={logo} alt="DTET Logo" className="w-50 h-12 mr-3" />
            </div>
            {/* Forgot Password Form */}
            <div className="text-center mt-8 mb-8">
              <h2 className="text-xl font-bold mb-12">Forgot Password?</h2>
              <label htmlFor="email" className="block mb-2 text-left">
                Email:
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-6"
              />
              <button
                onClick={handleRequest}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 mt-8 rounded-md transition duration-300"
              >
                Next
              </button>
              <ToastContainer position="bottom-right" autoClose={3000} />
            </div>
          </div>

          {/* Right side: image */}
          <div className="w-full md:w-7/12">
            <img
              src={students}
              alt="Graduation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
