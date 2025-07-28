import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import NavbarAdmin from "../components/layout/NavbarAdmin";
import SidebarAdmin from "../components/layout/SidebarAdmin";

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    designation: "",
    homeNo: "",
    street: "",
    city: "",
    district: "",
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    branch: "",
    phoneNumbers: [],
    languages: [],
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setForm(res.data);
      } catch (err) {
        console.error("Failed to load user data:", err);
        alert("You are not authorized or user not found.");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, index, value) => {
    const updated = [...form[name]];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [name]: updated }));
  };

  const addArrayItem = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/admin/users/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("User updated successfully.");
      navigate(`/admin/user/${id}`); // back to detail page
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAdmin />
      <div className="flex pt-16">
        <SidebarAdmin />
        <main className="flex-1 py-10 px-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white p-8 shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">
              Edit User Profile
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="input"
              />
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="input"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="input"
              />
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="Designation"
                className="input"
              />
              <input
                type="text"
                name="homeNo"
                value={form.homeNo}
                onChange={handleChange}
                placeholder="Home No"
                className="input"
              />
              <input
                type="text"
                name="street"
                value={form.street}
                onChange={handleChange}
                placeholder="Street"
                className="input"
              />
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="input"
              />
              <input
                type="text"
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="District"
                className="input"
              />
              <input
                type="text"
                name="accountHolderName"
                value={form.accountHolderName}
                onChange={handleChange}
                placeholder="Account Holder"
                className="input"
              />
              <input
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                placeholder="Account Number"
                className="input"
              />
              <input
                type="text"
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                placeholder="Bank Name"
                className="input"
              />
              <input
                type="text"
                name="branch"
                value={form.branch}
                onChange={handleChange}
                placeholder="Branch"
                className="input"
              />

              {/* Phone Numbers */}
              <div className="md:col-span-2">
                <label className="block font-medium text-blue-700 mb-2">
                  Phone Numbers
                </label>
                {form.phoneNumbers.map((num, idx) => (
                  <div key={idx} className="flex items-center mb-2 gap-2">
                    <input
                      value={num}
                      onChange={(e) =>
                        handleArrayChange("phoneNumbers", idx, e.target.value)
                      }
                      placeholder={`Phone ${idx + 1}`}
                      className="input flex-1"
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
                  className="text-blue-600 mt-2 text-sm"
                >
                  ➕ Add Phone Number
                </button>
              </div>

              {/* Languages */}
              <div className="md:col-span-2">
                <label className="block font-medium text-blue-700 mb-2">
                  Languages
                </label>
                {form.languages.map((lang, idx) => (
                  <div key={idx} className="flex items-center mb-2 gap-2">
                    <input
                      value={lang}
                      onChange={(e) =>
                        handleArrayChange("languages", idx, e.target.value)
                      }
                      placeholder={`Language ${idx + 1}`}
                      className="input flex-1"
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
                  className="text-blue-600 mt-2 text-sm"
                >
                  ➕ Add Language
                </button>
              </div>

              <div className="md:col-span-2 flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
