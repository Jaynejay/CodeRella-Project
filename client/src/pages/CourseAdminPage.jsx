import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

export default function CourseAdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async () => {
    const params = new URLSearchParams(location.search);
    const activeOnly = params.get("active") === "true";
    const res = await axios.get("/admin/users?role=COURSE_ADMIN");
    const filtered = activeOnly
      ? res.data.filter((user) => user.active)
      : res.data;
    setUsers(filtered);
  };

  useEffect(() => {
    loadUsers();
  }, [location.search]);

  return (
    <div className="p-5 space-y-6">
      <h2 className="text-xl font-bold">Course Administrators</h2>

      <button
        onClick={() => navigate("/admin/create?role=COURSE_ADMIN")}
        className="my-2 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Create Course Administrator
      </button>
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Status</th>
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
                {user.active ? "Active" : "Pending"}
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
            <strong>Status:</strong>{" "}
            {selectedUser.active ? "Active" : "Pending"}
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
