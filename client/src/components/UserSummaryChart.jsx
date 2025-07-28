// --- UserSummaryChart.jsx ---
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import axios from "../axios";

const COLORS = ["#00C49F", "#A569BD", "#FFBB28", "#3498DB"];

export default function UserSummaryChart() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await axios.get("/admin/user-summary");
      setSummary(res.data);
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <div className="p-4 bg-white shadow rounded-xl text-center text-gray-600">
        Loading summary...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-center mb-6">User Summary</h2>

      <div className="flex items-center justify-between mb-4 px-2 text-sm">
        <div className="text-green-600 font-medium text-base">
          Active Users:{" "}
          <span className="font-semibold">{summary.activeUsers}</span>
        </div>
        <div className="text-gray-400 font-medium text-base">
          Inactive Users:{" "}
          <span className="font-semibold">{summary.inactiveUsers}</span>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={summary.roles}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="count"
            >
              {summary.roles.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center text-xl font-bold mt-2 mb-6">
        Total Users: {summary.totalUsers}
      </div>

      <ul className="space-y-1 text-sm text-gray-700">
        {summary.roles.map((role, index) => (
          <li
            key={role.name}
            className="flex items-center justify-between px-2 py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="capitalize">{role.name.replace("_", " ")}</span>
            </div>
            <span>
              {role.count} (
              {((role.count / summary.totalUsers) * 100).toFixed(2)}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
