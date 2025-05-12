// --- AdminPanel.jsx ---
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";
import UserSummaryChart from "../components/UserSummaryChart";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);

  const loadPending = async () => {
    const res = await axios.get("/admin/pending");
    setPendingUsers(res.data);
  };

  const approve = async (id) => {
    await axios.put(`/admin/approve/${id}`);
    alert("Approved!");
    loadPending();
  };

  useEffect(() => {
    loadPending();
  }, []);

  return (
    <div className="p-5 space-y-6">
      <div className="flex gap-4 pb-6">
        <button
          onClick={() => navigate("/admin/exam-admins?active=true")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Exam Admins
        </button>
        <button
          onClick={() => navigate("/admin/payment-coordinators?active=true")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Payment Coordinators
        </button>
        <button
          onClick={() => navigate("/admin/course-admins?active=true")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Course Admins
        </button>
        <button
          onClick={() => navigate("/admin/paper-setters?active=true")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Paper Setters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UserSummaryChart />

        <div>
          <h2 className="text-xl font-bold mb-2">
            Pending Paper Setters (First 3)
          </h2>
          <ul className="space-y-2">
            {pendingUsers.slice(0, 3).map((user) => (
              <li key={user.id} className="border p-2 flex justify-between">
                <span>{user.email}</span>
                <button
                  onClick={() => approve(user.id)}
                  className="bg-green-500 px-3 py-1 text-white"
                >
                  Approve
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate("/admin/pending")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            View All Pending Requests
          </button>
        </div>
      </div>
    </div>
  );
}
