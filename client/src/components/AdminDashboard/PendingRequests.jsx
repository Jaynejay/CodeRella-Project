function PendingRequests() {
  const requests = [
    { name: "John Doe", time: "2h ago" },
    { name: "John Doe", time: "2h ago" },
    { name: "John Doe", time: "2h ago" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Pending Requests</h2>
        <div className="text-sm text-blue-500 cursor-pointer">View All</div>
      </div>

      {requests.map((req, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-3 border-b last:border-b-0"
        >
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-bold">
                {req.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold">{req.name}</p>
              <p className="text-sm text-gray-500">Submitted {req.time}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
              Approve
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
              Deny
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PendingRequests;
