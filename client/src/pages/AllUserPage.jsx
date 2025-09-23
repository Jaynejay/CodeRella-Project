// src/pages/admin/AllUsersPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import NavbarAdmin from "../components/layout/NavbarAdmin";
import SidebarAdmin from "../components/layout/SidebarAdmin";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/layout/SearchBar";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/admin/users/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (term) => {
    const lower = term.toLowerCase();
    let results = users.filter(
      (user) =>
        user.username.toLowerCase().includes(lower) ||
        user.email.toLowerCase().includes(lower) ||
        `${user.firstname} ${user.lastname}`.toLowerCase().includes(lower)
    );

    if (statusFilter === "ACTIVE") {
      results = results.filter((user) => user.active);
    } else if (statusFilter === "INACTIVE") {
      results = results.filter((user) => !user.active);
    }

    setFiltered(results);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavbarAdmin />
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow hidden md:block">
          <SidebarAdmin />
        </aside>

        <main className="flex-1 p-10 overflow-auto mt-16">
          <div className="bg-white p-6 shadow rounded-2xl">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              All User Accounts
            </h2>
            <div className="mb-4">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex gap-2 mb-4">
              {["ALL", "ACTIVE", "INACTIVE"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    handleSearch(""); // trigger refiltering
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    statusFilter === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {status === "ALL"
                    ? "All"
                    : status === "ACTIVE"
                    ? "Active"
                    : "Inactive"}
                </button>
              ))}
            </div>

            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-blue-100 text-gray-800 text-left">
                  <tr>
                    <th className="px-5 py-3">Username</th>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Role</th>
                    <th className="px-5 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-blue-100 transition cursor-pointer border-b border-blue-100"
                      onClick={() => navigate(`/admin/user/${user.id}`)}
                    >
                      <td className="px-5 py-3">{user.username}</td>
                      <td className="px-5 py-3">
                        {user.firstname} {user.lastname}
                      </td>
                      <td className="px-5 py-3">{user.email}</td>
                      <td className="px-5 py-3 capitalize">{user.role}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            user.active
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {user.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No matching users found.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
