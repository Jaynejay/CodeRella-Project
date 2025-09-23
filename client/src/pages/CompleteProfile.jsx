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

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayItem = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayItem = (field, index) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updated });
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
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-10 mx-auto">
        {/* Logo and Header */}
        <div className="flex items-center mb-6">
          <img src={logo} alt="DTET Logo" className="h-12 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            Complete Your Profile
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "firstname",
              "lastname",
              "nic",
              "designation",
              "dateOfBirth",
              "homeNo",
              "street",
              "city",
              "district",
              "accountHolderName",
              "accountNumber",
              "bankName",
              "branch",
            ].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={field === "dateOfBirth" ? "date" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={[
                    "firstname",
                    "lastname",
                    "nic",
                    "dateOfBirth",
                    "district",
                    "accountHolderName",
                    "accountNumber",
                    "bankName",
                    "branch",
                  ].includes(field)}
                  minLength={field === "nic" ? 10 : undefined}
                  pattern={
                    field === "nic"
                      ? "^([0-9]{9}[vV]|[0-9]{12})$"
                      : field === "accountNumber"
                      ? "\\d{6,}"
                      : undefined
                  }
                  title={
                    field === "nic"
                      ? "NIC should be 9 digits followed by V or 12 digits"
                      : field === "accountNumber"
                      ? "Account number must be at least 6 digits"
                      : undefined
                  }
                />
              </div>
            ))}
          </div>

          {/* Phone Numbers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Numbers
            </label>
            {form.phoneNumbers.map((num, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={num}
                  onChange={(e) =>
                    handleArrayChange("phoneNumbers", idx, e.target.value)
                  }
                  placeholder={`Phone ${idx + 1}`}
                  className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="\d{10}"
                  title="Phone number must be 10 digits"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("phoneNumbers", idx)}
                  className="text-red-600 font-bold"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("phoneNumbers")}
              className="text-blue-600 text-sm mt-1"
            >
              ➕ Add Phone Number
            </button>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages
            </label>
            {form.languages.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={lang}
                  onChange={(e) =>
                    handleArrayChange("languages", idx, e.target.value)
                  }
                  placeholder={`Language ${idx + 1}`}
                  className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("languages", idx)}
                  className="text-red-600 font-bold"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("languages")}
              className="text-blue-600 text-sm mt-1"
            >
              ➕ Add Language
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-10 mx-auto">
        {/* Logo and Header */}
        <div className="flex items-center mb-6">
          <img src={logo} alt="DTET Logo" className="h-12 mr-3" />
          <h2 className="text-2xl font-bold text-gray-800">
            Complete Your Profile
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "firstname",
              "lastname",
              "nic",
              "designation",
              "dateOfBirth",
              "homeNo",
              "street",
              "city",
              "district",
              "accountHolderName",
              "accountNumber",
              "bankName",
              "branch",
            ].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={field === "dateOfBirth" ? "date" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={[
                    "firstname",
                    "lastname",
                    "nic",
                    "dateOfBirth",
                    "district",
                    "accountHolderName",
                    "accountNumber",
                    "bankName",
                    "branch",
                  ].includes(field)}
                  minLength={field === "nic" ? 10 : undefined}
                  pattern={
                    field === "nic"
                      ? "^([0-9]{9}[vV]|[0-9]{12})$"
                      : field === "accountNumber"
                      ? "\\d{6,}"
                      : undefined
                  }
                  title={
                    field === "nic"
                      ? "NIC should be 9 digits followed by V or 12 digits"
                      : field === "accountNumber"
                      ? "Account number must be at least 6 digits"
                      : undefined
                  }
                />
              </div>
            ))}
          </div>

          {/* Phone Numbers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Numbers
            </label>
            {form.phoneNumbers.map((num, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={num}
                  onChange={(e) =>
                    handleArrayChange("phoneNumbers", idx, e.target.value)
                  }
                  placeholder={`Phone ${idx + 1}`}
                  className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="\d{10}"
                  title="Phone number must be 10 digits"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("phoneNumbers", idx)}
                  className="text-red-600 font-bold"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("phoneNumbers")}
              className="text-blue-600 text-sm mt-1"
            >
              ➕ Add Phone Number
            </button>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages
            </label>
            {form.languages.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={lang}
                  onChange={(e) =>
                    handleArrayChange("languages", idx, e.target.value)
                  }
                  placeholder={`Language ${idx + 1}`}
                  className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("languages", idx)}
                  className="text-red-600 font-bold"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("languages")}
              className="text-blue-600 text-sm mt-1"
            >
              ➕ Add Language
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
