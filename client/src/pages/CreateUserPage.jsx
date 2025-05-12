// --- CreateUserPage.jsx ---
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../axios";

export default function CreateUserPage() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
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
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/admin/create?email=${form.email}&password=${form.password}&role=${role}`,
        form
      );
      alert("Account created");
      navigate(-1);
    } catch (err) {
      alert("Error creating account");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Create {role?.replace("_", " ")}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          name="nic"
          placeholder="NIC"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          name="designation"
          placeholder="Designation"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          name="dateOfBirth"
          type="date"
          onChange={handleChange}
          required
          className="w-full p-2 border"
        />
        <input
          name="phoneNumbers"
          placeholder="Phone Numbers (comma-separated)"
          onChange={(e) =>
            setForm({ ...form, phoneNumbers: e.target.value.split(",") })
          }
          className="w-full p-2 border"
        />
        <input
          name="languages"
          placeholder="Languages (comma-separated)"
          onChange={(e) =>
            setForm({ ...form, languages: e.target.value.split(",") })
          }
          className="w-full p-2 border"
        />
        <input
          name="homeNo"
          placeholder="Home No"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="street"
          placeholder="Street"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="district"
          placeholder="District"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="accountHolderName"
          placeholder="Account Holder Name"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="accountNumber"
          placeholder="Account Number"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="bankName"
          placeholder="Bank Name"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="branch"
          placeholder="Branch"
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}
