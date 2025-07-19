import { useEffect, useState } from "react";
import axios from "../axios"; // your custom axios with base URL
import { useNavigate } from "react-router-dom";
import SideBar from "../components/layout/SideBar";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        // Fetch user details
        const res = await axios.get("/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);

        // Try loading the profile image
        try {
          const imageRes = await axios.get("/user/profile-image", {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob",
          });

          const imageUrl = URL.createObjectURL(imageRes.data);
          setImageUrl(imageUrl);
        } catch (imageError) {
          console.warn("No profile image found. Showing placeholder.");
          setImageUrl("/default-avatar.png"); // path to placeholder in /public
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 overflow-y-auto py-12 px-6">
      <div className="max-w-5xl mx-auto p-10 bg-white shadow-2xl rounded-2xl">
        {/* Profile Picture and Name */}
        <div className="flex flex-col items-center mb-12">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-extrabold shadow-inner border">
              {user.firstname?.charAt(0)}
            </div>
          )}
          <h2 className="text-3xl font-bold mt-4 text-blue-800">
            {user.firstname} {user.lastname}
          </h2>
          <p className="text-gray-500 text-lg">{user.designation}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-800">
          {/* Basic Info */}
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
              Basic Information
            </h3>
            <p>
              <span className="font-medium">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Role:</span> {user.role}
            </p>
          </div>

          {/* Personal Details */}
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
              Personal Details
            </h3>
            <p>
              <span className="font-medium">First Name:</span> {user.firstname}
            </p>
            <p>
              <span className="font-medium">Last Name:</span> {user.lastname}
            </p>
            <p>
              <span className="font-medium">NIC:</span> {user.nic}
            </p>
            <p>
              <span className="font-medium">Designation:</span>{" "}
              {user.designation}
            </p>
            <p>
              <span className="font-medium">Date of Birth:</span>{" "}
              {user.dateOfBirth}
            </p>
          </div>

          {/* Address Info */}
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
              Address
            </h3>
            <p>
              <span className="font-medium">Home No:</span> {user.homeNo}
            </p>
            <p>
              <span className="font-medium">Street:</span> {user.street}
            </p>
            <p>
              <span className="font-medium">City:</span> {user.city}
            </p>
            <p>
              <span className="font-medium">District:</span> {user.district}
            </p>
          </div>

          {/* Bank Details */}
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
              Bank Details
            </h3>
            <p>
              <span className="font-medium">Account Holder:</span>{" "}
              {user.accountHolderName}
            </p>
            <p>
              <span className="font-medium">Account Number:</span>{" "}
              {user.accountNumber}
            </p>
            <p>
              <span className="font-medium">Bank Name:</span> {user.bankName}
            </p>
            <p>
              <span className="font-medium">Branch:</span> {user.branch}
            </p>
          </div>

          {/* Phone Numbers */}
          <div className="md:col-span-2 space-y-1">
            <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
              Phone Numbers
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              {user.phoneNumbers.map((num, i) => (
                <li key={i}>{num}</li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="md:col-span-2 space-y-1">
            <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
              Languages
            </h3>
            <ul className="list-disc ml-6 space-y-1">
              {user.languages.map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-6">
          <button
            onClick={() => navigate("/edit-profile")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/change-password")}
            className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
