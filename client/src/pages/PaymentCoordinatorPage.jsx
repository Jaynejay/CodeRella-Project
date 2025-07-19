import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/layout/SidebarAdmin";
import NavbarAdmin from "../components/layout/NavbarAdmin";

export default function PaymentCoordinatorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async () => {
    const params = new URLSearchParams(location.search);
    const activeOnly = params.get("active") === "true";
    const res = await axios.get("/admin/users?role=PAYMENT_COORDINATOR");
    const filtered = activeOnly
      ? res.data.filter((user) => user.active)
      : res.data;
    setUsers(filtered);
  };

  useEffect(() => {
    loadUsers();
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAdmin />
      <div className="flex pt-16">
        <SidebarAdmin />
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Payment Coordinators
          </h2>

          <button
            onClick={() => navigate("/admin/create?role=PAYMENT_COORDINATOR")}
            className="mb-6 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            + Create Payment Coordinator
          </button>

          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-blue-100 text-gray-800 text-left">
                <tr>
                  <th className="px-5 py-3">Username</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="bg-blue-50">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="hover:bg-blue-100 transition cursor-pointer border-b border-blue-100"
                  >
                    <td className="px-5 py-3">{user.username}</td>
                    <td className="px-5 py-3">
                      {user.firstname} {user.lastname}
                    </td>
                    <td className="px-5 py-3">{user.email}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          user.active
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {user.active ? "Active" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedUser && (
            <div className="mt-8 p-6 bg-white shadow-md rounded-xl space-y-2">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                User Details
              </h3>
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
                {selectedUser.street}, {selectedUser.city},{" "}
                {selectedUser.district}
              </p>
              <p>
                <strong>Bank Info:</strong> {selectedUser.accountHolderName},{" "}
                {selectedUser.accountNumber}, {selectedUser.bankName},{" "}
                {selectedUser.branch}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
