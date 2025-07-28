import { useEffect, useState } from "react";
import axios from "../axios";
import NavbarAdmin from "../components/layout/NavbarAdmin";
import SidebarAdmin from "../components/layout/SidebarAdmin";

export default function AllActivitiesPage() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        const res = await axios.get("/admin/activities", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setActivities(res.data);
      } catch (err) {
        console.error("Failed to load activities", err);
      }
    };

    fetchAllActivities();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <NavbarAdmin />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg hidden md:block">
          <SidebarAdmin />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto py-12 px-6">
          <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">
              All User Activities
            </h2>

            {activities.length === 0 ? (
              <p className="text-gray-500 text-sm">No user activities found.</p>
            ) : (
              <ul className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {activities.map((a, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm text-gray-800">
                        <strong className="text-blue-700">{a.username}</strong>{" "}
                        {a.action}
                      </p>
                      <span className="text-xs text-gray-500">
                        {new Date(a.timestamp).toLocaleString()}
                      </span>
                    </div>
                    {a.details && (
                      <p className="text-sm text-gray-600">{a.details}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
