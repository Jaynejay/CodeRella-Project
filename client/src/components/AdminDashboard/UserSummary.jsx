import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function UserSummary() {
  const data = [
    { name: "Paper Setters", value: 1962 },
    { name: "Exam Administrator", value: 26 },
    { name: "Payment Co-ordinator", value: 52 },
    { name: "Course Administrator", value: 42 },
  ];

  const COLORS = ["#06b6d4", "#8b5cf6", "#f59e0b", "#3b82f6"];

  const activeUsers = 347;
  const inactiveUsers = 113;
  const totalUsers = 2345;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">User Summary</h2>
        <button className="text-gray-400">ⓘ</button>
      </div>

      <div className="flex gap-8 mt-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-700">Active Users: {activeUsers}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span className="text-gray-700">Inactive Users: {inactiveUsers}</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-48 h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
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

        {/* Total Users */}
        <div className="text-center mb-4">
          <p className="text-2xl font-bold">{totalUsers}</p>
          <p className="text-sm text-gray-500">Total Users</p>
        </div>

        {/* Active/Inactive Users Legends */}
      </div>

      {/* User Types List */}
      <div className="mt-6 space-y-2 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              {item.name}
            </span>
            <span className="text-gray-600">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSummary;
