import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import logo from "../assets/images/logo.svg";
import students from "../assets/images/bg.svg";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("firstLogin", res.data.firstLogin);

      // Navigate based on role and profile status
      if (res.data.scheduledForDeletion) {
        alert(
          "Your account is scheduled for deletion. Please contact admin to restore access."
        );
        return;
      } else if (!res.data.profileCompleted) {
        navigate("/complete-profile");
      } else if (!res.data.active) {
        alert("Your account is pending admin approval.");
        return;
      } else if (res.data.firstLogin) {
        navigate("/change-password");
      } else {
        switch (res.data.role) {
          case "SUPER_ADMIN":
            navigate("/admin");
            break;
          case "PAPER_SETTER":
            navigate("/userdashboard");
            break;
          case "EXAM_ADMIN":
            navigate("/dashboard");
            break;
          case "COURSE_ADMIN":
            navigate("/dashboard");
            break;
          case "PAYMENT_COORDINATOR":
            navigate("dashboard-payment-coordinators");
            break;
          default:
            alert("Unknown role");
            break;
        }
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Login Form */}
          <div className="w-full md:w-5/12 p-8 flex flex-col justify-between">
            <div>
              {/* Logo and Department Header */}
              <div className="flex items-center mb-6">
                <img src={logo} alt="DTET Logo" className="w-50 h-12 mr-3" />
              </div>

              {/* Login Form */}
              <div className="text-center">
                <div className="mt-8 mb-8">
                  <h1 className="text-xl font-bold mb-2">
                    Paper Sync Exam Paper Management System
                  </h1>

                  <p className="text-lg font-medium mb-6">Welcome Back!</p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="username" className="block mb-1">
                        Username:
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="block mb-1">
                        Password:
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      />
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                      >
                        Login
                      </button>
                    </div>

                    <div className="text-center mt-4">
                      <a
                        href="/forgot-password"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        forgot password?
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Sign Up Section */}
            <div className="mt-4 text-center">
              <p className="text-sm mb-2">Don&apos;t have an account?</p>
              <button
                onClick={() => navigate("/signup")}
                className="w-full bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition duration-300"
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Right Panel - Graduation Image */}
          <div className="w-full md:w-7/12 bg-gray-100">
            <img
              src={students}
              alt="Graduates throwing caps"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
