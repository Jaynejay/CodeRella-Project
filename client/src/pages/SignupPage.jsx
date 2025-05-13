import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/auth/signup?email=${form.email}&password=${form.password}`
      );
      alert(res.data);
      navigate("/");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data || "Error"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">Paper Setter Signup</h2>
      <input
        name="email"
        placeholder="Email"
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
      <button type="submit" className="bg-green-600 text-white py-2 px-4">
        Sign Up
      </button>
    </form>
  );
}
