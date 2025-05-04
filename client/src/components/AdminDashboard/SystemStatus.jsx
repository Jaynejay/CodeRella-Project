import { ArrowUpRight } from "lucide-react"; // Using lucide-react icon for arrow

function SystemStatus() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-bold mb-4">System Status</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-700">Healthy</span>
        </div>
        <ArrowUpRight className="text-green-500" />
      </div>

      <div className="text-sm text-gray-600 mb-2">
        <strong>App Version:</strong> Paper Sync v1.0.0
      </div>
      <div className="text-sm text-gray-600">
        <strong>Last Backup:</strong> 25-Apr-2025 10.00PM
      </div>
    </div>
  );
}

export default SystemStatus;
