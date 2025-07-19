import { useEffect, useState } from "react";
import axios from "../axios";
import NavbarAdmin from "../components/layout/NavbarAdmin";
import Footer from "../components/layout/Footer";

export default function AdminActivityPage() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const res = await axios.get("/admin/activities");
      setActivities(res.data);
    };
    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavbarAdmin />
      <main className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-6">All User Activities</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <ul className="divide-y">
            {activities.map((activity, index) => (
              <li key={index} className="py-3 text-sm text-gray-700">
                <strong>{activity.username}</strong> {activity.action} -{" "}
                {activity.details && (
                  <span className="text-gray-500">{activity.details} - </span>
                )}
                <span className="text-gray-400">
                  {new Date(activity.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
