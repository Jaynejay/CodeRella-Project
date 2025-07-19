import { useSearchParams, useNavigate } from "react-router-dom"; // For reading query params and navigating
import { useState } from "react";
import axios from "../axios";
import NavbarAdmin from "../components/layout/NavbarAdmin";
import SidebarAdmin from "../components/layout/SidebarAdmin";

export default function CreateUserPage() {
  // Get role from URL query string
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const navigate = useNavigate(); // For redirecting after submission

  // Initialize form state with all user fields
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input changes for normal fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/admin/create?role=${role}`, {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      alert("Account created successfully");
      navigate(-1); // go back
    } catch (err) {
      alert("Error creating account: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAdmin />
      <div className="flex pt-16">
        <SidebarAdmin />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Create {role?.replace("_", " ")}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Create Account
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
