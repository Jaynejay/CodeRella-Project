import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import logo from "../assets/images/logo.svg";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    nic: "",
    designation: "",
    dateOfBirth: "",
    phoneNumbers: [""],
    languages: [""],
    homeNo: "",
    street: "",
    city: "",
    district: "",
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    branch: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/complete-profile", form);
      alert("Profile submitted! Waiting for admin approval.");
      navigate("/");
    } catch (err) {
      alert("Error submitting profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8">
        {/* Logo and Department Header */}
        <div className="flex items-center mb-6">
          <img src={logo} alt="DTET Logo" className="w-50 h-12 mr-3" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto mt-10 grid gap-3"
        >
          <h2 className="text-2xl font-bold mb-4">
            Please Complete Your Profile to login
          </h2>
          <input
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            className="p-2 border"
            required
          />
          <input
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            className="p-2 border"
            required
          />
          <input
            name="nic"
            placeholder="NIC"
            onChange={handleChange}
            className="p-2 border"
            required
          />
          <input
            name="designation"
            placeholder="Designation"
            onChange={handleChange}
            className="p-2 border"
          />
          <input
            name="dateOfBirth"
            type="date"
            onChange={handleChange}
            className="p-2 border"
          />
          <input
            name="phoneNumbers"
            placeholder="Phone Numbers (comma separated)"
            onChange={(e) =>
              setForm({ ...form, phoneNumbers: e.target.value.split(",") })
            }
            className="p-2 border"
            required
          />
          <input
            name="languages"
            placeholder="Languages (comma separated)"
            onChange={(e) =>
              setForm({ ...form, languages: e.target.value.split(",") })
            }
            className="p-2 border"
            required
          />
          <input
            name="homeNo"
            placeholder="Home No"
            onChange={handleChange}
            className="p-2 border"
          />
          <input
            name="street"
            placeholder="Street"
            onChange={handleChange}
            className="p-2 border"
          />
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="p-2 border"
          />
          <input
            name="district"
            placeholder="District"
            onChange={handleChange}
            className="p-2 border"
            required
          />
          <input
            name="accountHolderName"
            placeholder="Account Holder Name"
            onChange={handleChange}
            className="p-2 border"
            required
          />
          <input
            name="accountNumber"
            placeholder="Account Number"
            onChange={handleChange}
            className="p-2 border"
            required
          />
          <input
            name="bankName"
            placeholder="Bank Name"
            onChange={handleChange}
            className="p-2 border"
            required
          />
          <input
            name="branch"
            placeholder="Branch"
            onChange={handleChange}
            className="p-2 border"
            required
          />
          <button type="submit" className="bg-purple-600 text-white p-2 mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
