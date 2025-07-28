// --- AdminPanel.jsx ---
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // to manage component state and lifecycle
import axios from "../axios";
import UserSummaryChart from "../components/UserSummaryChart";
import NavbarAdmin from "../components/layout/NavbarAdmin";
import Footer from "../components/layout/Footer";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [activities, setActivities] = useState([]);

  // fetch recent activities
  const loadActivities = async () => {
    const res = await axios.get("/admin/activities");
    setActivities(res.data);
  };

  // fetch pending users
  const loadPending = async () => {
    const res = await axios.get("/admin/pending");
    setPendingUsers(res.data);
  };

  // approve user and refresh the list
  const approve = async (id) => {
    await axios.put(`/admin/approve/${id}`);
    alert("Approved!");
    loadPending(); // reload list after approval
  };

  const decline = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to decline this request? This action cannot be undone."
      )
    )
      return;
    try {
      await axios.delete(`/admin/decline/${id}`);
      alert("Declined!");
      loadPending(); // reload list after decline
    } catch (err) {
      console.error("Failed to decline user:", err);
      alert("Failed to decline user.");
    }
  };

  // Load pending users on initial render
  useEffect(() => {
    loadPending();
    loadActivities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header>
        <NavbarAdmin />
      </header>

      <div className="flex flex-1 mb-8">
        <main className="pt-20 px-20 w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
          <h1 className="text-2xl font-bold text-gray-800 col-span-4">
            Dashboard
          </h1>

          <div className="flex flex-wrap gap-3 mb-1 col-span-4 w-full">
            <div className="flex w-full gap-3">
              <button
                onClick={() => navigate("/admin/exam-admins?active=true")}
                className="flex-1 bg-blue-100 hover:bg-blue-200 text-gray-800 py-4 px-4 rounded-lg text-sm font-medium"
              >
                Exam Admins
              </button>
              <button
                onClick={() =>
                  navigate("/admin/payment-coordinators?active=true")
                }
                className="flex-1 bg-blue-100 hover:bg-blue-200 text-gray-800 py-4 px-4 rounded-lg text-sm font-medium"
              >
                Payment Coordinators
              </button>
              <button
                onClick={() => navigate("/admin/course-admins?active=true")}
                className="flex-1 bg-blue-100 hover:bg-blue-200 text-gray-800 py-4 px-4 rounded-lg text-sm font-medium"
              >
                Course Admins
              </button>
              <button
                onClick={() => navigate("/admin/paper-setters?active=true")}
                className="flex-1 bg-blue-100 hover:bg-blue-200 text-gray-800 py-4 px-4 rounded-lg text-sm font-medium"
              >
                Paper Setters
              </button>
            </div>
          </div>
          <section className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
              {/* Pending Requests */}
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex justify-between mb-3">
                  <h2 className="text-lg font-semibold">Pending Requests</h2>
                  <button
                    onClick={() => navigate("/admin/pending")}
                    className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm text-left">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="bg-gray-100 text-gray-700 font-medium px-4 py-2 whitespace-nowrap">
                          Username
                        </th>
                        <th className="bg-gray-100 text-gray-700 font-medium px-4 py-2 whitespace-nowrap">
                          Name
                        </th>
                        <th className="bg-gray-100 text-gray-700 font-medium px-4 py-2 whitespace-nowrap">
                          Email
                        </th>
                        <th className="bg-gray-100 text-gray-700 font-medium px-4 py-2 whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingUsers.slice(0, 3).map((user) => (
                        <tr key={user.id}>
                          <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                            {user.username}
                          </td>
                          <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                            {user.firstname} {user.lastname}
                          </td>
                          <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                            {user.email}
                          </td>
                          <td className="px-4 py-2 text-gray-700 whitespace-nowrap space-x-2">
                            <button
                              onClick={() => approve(user.id)}
                              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => decline(user.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Decline
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Recent User Activities
                </h2>
                <button
                  onClick={() => navigate("/admin/activity")}
                  className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
                >
                  View All
                </button>
              </div>

              {activities.length === 0 ? (
                <p className="text-gray-500 text-sm">No recent activities.</p>
              ) : (
                <ul className="space-y-3">
                  {activities.slice(0, 3).map((activity, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow transition"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm text-gray-800">
                          <strong className="text-blue-700">
                            {activity.username}
                          </strong>{" "}
                          {activity.action}
                        </p>
                        <span className="text-xs text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {activity.details && (
                        <p className="text-sm text-gray-600">
                          {activity.details}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <aside className="col-span-1">
            <UserSummaryChart />
          </aside>
        </main>
      </div>
      <div className="pt=8">
        <Footer />
      </div>
    </div>
  );
}
