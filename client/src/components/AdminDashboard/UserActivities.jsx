function UserActivities() {
  const activities = [
    { name: "Jane Smith", action: "logged in", time: "2 min ago" },
    { name: "John Doe", action: "Updated profile picture", time: "2h ago" },
    { name: "Haris", action: "submitted an Exam paper", time: "yesterday" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Recent User Activities</h2>
        <div className="text-sm text-blue-500 cursor-pointer">View All</div>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-bold">
                {activity.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold">
                {activity.name}{" "}
                <span className="text-gray-500">{activity.action}</span>
              </p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserActivities;
