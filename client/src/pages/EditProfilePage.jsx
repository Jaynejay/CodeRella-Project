import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import NavbarAdmin from "../components/layout/NavbarAdmin";
import SidebarAdmin from "../components/layout/SidebarAdmin";
import { useUser } from "../context/UserContext"; // adjust path as needed

export default function EditProfilePage() {
  const [form, setForm] = useState(null);
  const [originalForm, setOriginalForm] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { user, refreshImage } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Extract only the editable fields
      const {
        firstname,
        lastname,
        nic,
        designation,
        dateOfBirth,
        phoneNumbers,
        languages,
        homeNo,
        street,
        city,
        district,
        accountHolderName,
        accountNumber,
        bankName,
        branch,

        profileImageUrl,
      } = res.data;

      const profileData = {
        firstname,
        lastname,
        nic,
        designation,
        dateOfBirth,
        phoneNumbers: phoneNumbers || [],
        languages: languages || [],
        homeNo,
        street,
        city,
        district,
        accountHolderName,
        accountNumber,
        bankName,
        branch,
        profileImageFile: null,
        profileImageUrl,
      };

      setForm(profileData);
      setOriginalForm(profileData);
      setPreview(profileImageUrl || null);
    };
    fetchData();
  }, []);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profileImageFile: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, upload profile image if selected
      if (form.profileImageFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", form.profileImageFile);

        await axios.post("/user/upload-profile-image", imageFormData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      refreshImage();

      // Then update other profile data
      await axios.put("/user/update-profile", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile: " + (err.response?.data || err.message));
    }
  };

  const isFormChanged = () => {
    if (!form || !originalForm) return false;
    const { profileImageFile, ...currentForm } = form;
    const { profileImageFile: _, ...original } = originalForm;
    return (
      JSON.stringify(currentForm) !== JSON.stringify(original) ||
      profileImageFile
    );
  };

  if (!form) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavbarAdmin />

      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <SidebarAdmin />
        </aside>

        <main className="flex-1 overflow-y-auto px-6 py-12">
          <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
            <h2 className="text-3xl font-bold text-blue-800 mb-8">
              Edit My Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 rounded-full mb-3 object-cover shadow border-2 border-blue-500"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Input Fields Grid */}
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
                      value={form[field] || ""}
                      onChange={handleChange}
                      className="border border-gray-300 rounded px-4 py-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      minLength={field === "nic" ? 10 : 2}
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

              {/* Comma-separated lists */}
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

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    if (isFormChanged()) {
                      setShowConfirmModal(true);
                    } else {
                      navigate("/profile");
                    }
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!isFormChanged()}
                  className={`px-6 py-2 rounded text-white transition ${
                    isFormChanged()
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Save Changes
                </button>
              </div>
            </form>

            {/* Confirmation Modal */}
            {showConfirmModal && (
              <ConfirmModal
                title="Unsaved Changes"
                message="You have unsaved changes. Are you sure you want to cancel?"
                onConfirm={() => navigate("/profile")}
                onCancel={() => setShowConfirmModal(false)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
