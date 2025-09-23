import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import NavbarAdmin from "../components/layout/NavbarAdmin";
import SidebarAdmin from "../components/layout/SidebarAdmin";

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        try {
          const imageRes = await axios.get(`/admin/users/${id}/profile-image`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob", // This is important
          });

          const imageBlobUrl = URL.createObjectURL(imageRes.data);
          setImageUrl(imageBlobUrl);
        } catch (imageErr) {
          console.warn("No profile image found. Using default.");
          setImageUrl("/default-avatar.png"); // Use a placeholder
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };

    loadUser();
  }, [id]);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAdmin />
      <div className="flex pt-16">
        <SidebarAdmin />
        <main className="flex-1 py-12 px-6 overflow-y-auto">
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
                <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-extrabold shadow-inner border">
                  {user.firstname?.charAt(0)}
                </div>
              )}
              <h2 className="text-3xl font-bold mt-4 text-blue-800">
                {user.firstname} {user.lastname}
              </h2>
              <p className="text-gray-500 text-lg">{user.designation}</p>
            </div>

            {/* Info Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-800">
              {/* Basic Info */}
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
                  Basic Information
                </h3>
                <p>
                  <strong>Username:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Status:</strong> {user.active ? "Active" : "Pending"}
                </p>
              </div>

              {/* Personal Details */}
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
                  Personal Details
                </h3>
                <p>
                  <strong>NIC:</strong> {user.nic}
                </p>
                <p>
                  <strong>Designation:</strong> {user.designation}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {user.dateOfBirth}
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

              {/* Bank Info */}
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
                  Bank Information
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
                  <span className="font-medium">Bank Name:</span>{" "}
                  {user.bankName}
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
                  {user.phoneNumbers?.map((num, i) => (
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
                  {user.languages?.map((lang, i) => (
                    <li key={i}>{lang}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 flex justify-end space-x-4">
              <button
                onClick={() => navigate(`/admin/user/${user.id}/edit`)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Edit Profile
              </button>

              {user.scheduledForDeletion && (
                <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-600 text-yellow-800 rounded">
                  <strong>Scheduled for deletion:</strong>{" "}
                  {new Date(user.deletionScheduledAt).toLocaleDateString()}
                </div>
              )}

              <div className="mt-4 flex justify-end space-x-4">
                {!user.scheduledForDeletion ? (
                  <button
                    onClick={async () => {
                      if (
                        confirm("Are you sure you want to delete this user?")
                      ) {
                        try {
                          const token = localStorage.getItem("token");
                          await axios.put(
                            `/admin/users/${user.id}/delete`,
                            null,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );
                          alert("User scheduled for deletion.");
                          window.location.reload();
                        } catch (err) {
                          console.error(err);
                          alert("Failed to delete user.");
                        }
                      }
                    }}
                    className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Delete User
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem("token");
                        await axios.put(
                          `/admin/users/${user.id}/undo-delete`,
                          null,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        alert("Deletion undone. User reactivated.");
                        window.location.reload();
                      } catch (err) {
                        console.error(err);
                        alert("Failed to undo deletion.");
                      }
                    }}
                    className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
                  >
                    Undo Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
