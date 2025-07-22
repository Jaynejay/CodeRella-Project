import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import logo from "../assets/images/logo.svg";
import students from "../assets/images/bg.svg";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(
        `/auth/signup?username=${form.username}&email=${form.email}&password=${form.password}`
      );
      alert(res.data);
      navigate("/");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data || "Error"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel */}
          <div className="w-full md:w-5/12 p-8 flex flex-col justify-between">
            <div>
              {/* Logo and Department Header */}
              <div className="flex items-center mb-6">
                <img src={logo} alt="DTET Logo" className="w-50 h-12 mr-3" />
              </div>

              {/* Account Setup Form */}
              <div className="mt-8 mb-8">
                <h1 className="text-xl font-bold mb-8">
                  Set Up Your Account !
                </h1>
                <form
                  onSubmit={handleSubmit}
                  className="max-w-sm mx-auto mt-20 text-center"
                >
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
                    <label htmlFor="email" className="block mb-1">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
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
                      minLength={8}
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-12 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Sign Up
                    </button>
                  </div>

                  <div className="mt-4 top-0 text-center">
                    <p className="text-sm mb-2">Do you have an account?</p>
                    <button
                      onClick={() => navigate("/")}
                      className="w-full bg-white border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition duration-300"
                    >
                      Log in
                    </button>
                  </div>
                </form>
              </div>
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
