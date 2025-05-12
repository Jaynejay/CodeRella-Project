// --- PendingRequests.jsx ---
import { useEffect, useState } from "react";
import axios from "../axios";

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
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xl font-bold">All Pending Paper Setter Requests</h2>
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border">
                {user.firstname} {user.lastname}
              </td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    approve(user.id);
                  }}
                  className="bg-green-500 px-3 py-1 text-white rounded"
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="border p-4 mt-6 bg-gray-50 rounded">
          <h3 className="text-lg font-semibold mb-2">User Details</h3>
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
          <p>
            <strong>Phone Numbers:</strong>{" "}
            {selectedUser.phoneNumbers?.join(", ")}
          </p>
          <p>
            <strong>Languages:</strong> {selectedUser.languages?.join(", ")}
          </p>
          <p>
            <strong>Address:</strong> {selectedUser.homeNo},{" "}
            {selectedUser.street}, {selectedUser.city}, {selectedUser.district}
          </p>
          <p>
            <strong>Bank Info:</strong> {selectedUser.accountHolderName},{" "}
            {selectedUser.accountNumber}, {selectedUser.bankName},{" "}
            {selectedUser.branch}
          </p>
        </div>
      )}
    </div>
  );
}
