import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

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

      // Navigate based on role
      switch (res.data.role) {
        case "SUPER_ADMIN":
          navigate("/admin");
          break;
        case "PAPER_SETTER":
          navigate("/complete-profile");
          break;
        default:
          alert("Unknown role");
          break;
      }
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="block w-full mb-2 p-2 border"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="block w-full mb-2 p-2 border"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4">
        Login
      </button>
    </form>
  );
}
