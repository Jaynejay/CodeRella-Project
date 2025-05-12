// --- UserSummaryChart.jsx ---
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
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

  if (!summary) return <p>Loading summary...</p>;

  return (
    <div className="p-4 shadow rounded bg-white w-full max-w-xs">
      <h2 className="text-center font-semibold text-lg mb-2">User Summary</h2>

      <div className="text-sm flex justify-between px-2 mb-2">
        <span>Active Users: {summary.activeUsers}</span>
        <span>Inactive Users: {summary.inactiveUsers}</span>
      </div>

      <div className="flex justify-center">
        <PieChart width={200} height={200}>
          <Pie
            data={summary.roles}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            paddingAngle={2}
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
      </div>

      <div className="text-center text-xl font-bold mt-2">
        Total Users: {summary.totalUsers}
      </div>

      <ul className="text-sm mt-4 space-y-1">
        {summary.roles.map((role, index) => (
          <li key={role.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 inline-block rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            {role.name}: {role.count} (
            {((role.count / summary.totalUsers) * 100).toFixed(2)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
