import { useEffect, useState } from "react";
import axios from "../axios"; // your custom axios with base URL
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/layout/SidebarAdmin";
import NavbarAdmin from "../components/layout/NavbarAdmin";

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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavbarAdmin />

      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <SidebarAdmin />
        </aside>

        <main className="flex-1 overflow-y-auto py-16 px-6">
          <div className="max-w-5xl mx-auto p-10 bg-white shadow-2xl rounded-2xl">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-12">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-3xl font-extrabold shadow-inner border">
                  {user.firstname?.charAt(0)}
                </div>
              )}
              <h2 className="text-3xl font-bold mt-4 text-blue-800">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-gray-500 text-lg">{user.designation}</p>
            </div>

            {/* Profile Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-800">
              {/* Reusable Section Style */}
              {[
                {
                  title: "Basic Information",
                  content: [
                    ["Username", user.username],
                    ["Email", user.email],
                    ["Role", user.role],
                  ],
                },
                {
                  title: "Personal Details",
                  content: [
                    ["First Name", user.firstname],
                    ["Last Name", user.lastname],
                    ["NIC", user.nic],
                    ["Designation", user.designation],
                    ["Date of Birth", user.dateOfBirth],
                  ],
                },
                {
                  title: "Address",
                  content: [
                    ["Home No", user.homeNo],
                    ["Street", user.street],
                    ["City", user.city],
                    ["District", user.district],
                  ],
                },
                {
                  title: "Bank Details",
                  content: [
                    ["Account Holder", user.accountHolderName],
                    ["Account Number", user.accountNumber],
                    ["Bank Name", user.bankName],
                    ["Branch", user.branch],
                  ],
                },
              ].map((section, index) => (
                <div className="space-y-1" key={index}>
                  <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
                    {section.title}
                  </h3>
                  {section.content.map(([label, value], i) => (
                    <p key={i}>
                      <span className="font-medium">{label}:</span> {value}
                    </p>
                  ))}
                </div>
              ))}

              {/* Phone Numbers */}
              <div className="md:col-span-2 space-y-1">
                <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
                  Phone Numbers
                </h3>
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
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
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
                  {user.languages.map((lang, i) => (
                    <li key={i}>{lang}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex justify-end gap-6">
              <button
                onClick={() => navigate("/edit-profile")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/change-password")}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Change Password
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
