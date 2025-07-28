import { useEffect, useState } from "react";
import axios from "../axios";
import NavbarAdmin from "../components/layout/NavbarAdmin";
import SidebarAdmin from "../components/layout/SidebarAdmin";

export default function PendingRequests() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async () => {
    const res = await axios.get("/admin/pending");
    setUsers(res.data);
  };

  const approve = async (id) => {
    await axios.put(`/admin/approve/${id}`);
    alert("Approved!");
    loadUsers();
    setSelectedUser(null);
  };

  const decline = async (id) => {
    if (!window.confirm("Are you sure you want to decline this request?"))
      return;
    try {
      await axios.delete(`/admin/decline/${id}`);
      alert("User request declined.");
      loadUsers();
      setSelectedUser(null);
    } catch (err) {
      console.error("Failed to decline user:", err);
      alert("Failed to decline user.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAdmin />
      <div className="flex pt-16">
        <SidebarAdmin />
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Pending Paper Setter Requests
          </h2>

          <div className="overflow-x-auto shadow rounded-lg bg-white">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-100 text-gray-800 uppercase text-sm">
                <tr>
                  <th className="p-3">Username</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="cursor-pointer hover:bg-gray-100 border-b"
                  >
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">
                      {user.firstname} {user.lastname}
                    </td>
                    <td className="p-3">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Popup Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-3xl p-6 relative animate-fadeIn">
            <button
              className="absolute top-3 right-4 text-gray-600 text-xl hover:text-red-500"
              onClick={() => setSelectedUser(null)}
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-blue-800 mb-4">
              User Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Name:</strong> {selectedUser.firstname}{" "}
                {selectedUser.lastname}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>NIC:</strong> {selectedUser.nic}
              </p>
              <p>
                <strong>Designation:</strong> {selectedUser.designation}
              </p>
              <p>
                <strong>Date of Birth:</strong> {selectedUser.dateOfBirth}
              </p>
              <p className="md:col-span-2">
                <strong>Phone Numbers:</strong>{" "}
                {selectedUser.phoneNumbers?.join(", ")}
              </p>
              <p className="md:col-span-2">
                <strong>Languages:</strong> {selectedUser.languages?.join(", ")}
              </p>
              <p className="md:col-span-2">
                <strong>Address:</strong> {selectedUser.homeNo},{" "}
                {selectedUser.street}, {selectedUser.city},{" "}
                {selectedUser.district}
              </p>
              <p className="md:col-span-2">
                <strong>Bank Info:</strong> {selectedUser.accountHolderName},{" "}
                {selectedUser.accountNumber}, {selectedUser.bankName},{" "}
                {selectedUser.branch}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => approve(selectedUser.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => decline(selectedUser.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
