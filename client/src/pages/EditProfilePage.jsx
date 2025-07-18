import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

export default function EditProfilePage() {
  const [form, setForm] = useState(null);
  const [originalForm, setOriginalForm] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

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
    <div className="max-w-3xl mx-auto mt-24 p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Edit My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Profile Photo</label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full mb-2 object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="firstname"
            placeholder="First Name"
            value={form.firstname || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="lastname"
            placeholder="Last Name"
            value={form.lastname || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="nic"
            placeholder="NIC"
            value={form.nic || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="designation"
            placeholder="Designation"
            value={form.designation || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="homeNo"
            placeholder="Home No"
            value={form.homeNo || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="street"
            placeholder="Street"
            value={form.street || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="city"
            placeholder="City"
            value={form.city || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="district"
            placeholder="District"
            value={form.district || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="accountHolderName"
            placeholder="Account Holder Name"
            value={form.accountHolderName || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="accountNumber"
            placeholder="Account Number"
            value={form.accountNumber || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="bankName"
            placeholder="Bank Name"
            value={form.bankName || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
          <input
            name="branch"
            placeholder="Branch"
            value={form.branch || ""}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
          />
        </div>

        {/* Phone numbers and languages as comma-separated values */}
        <input
          name="phoneNumbers"
          placeholder="Phone Numbers (comma-separated)"
          value={form.phoneNumbers?.join(", ") || ""}
          onChange={(e) =>
            setForm({
              ...form,
              phoneNumbers: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          className="border rounded px-4 py-2 w-full"
        />

        <input
          name="languages"
          placeholder="Languages (comma-separated)"
          value={form.languages?.join(", ") || ""}
          onChange={(e) =>
            setForm({
              ...form,
              languages: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          className="border rounded px-4 py-2 w-full"
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              if (isFormChanged()) {
                setShowConfirmModal(true);
              } else {
                navigate("/profile");
              }
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded"
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

      {showConfirmModal && (
        <ConfirmModal
          title="Unsaved Changes"
          message="You have unsaved changes. Are you sure you want to cancel?"
          onConfirm={() => navigate("/profile")}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}
