import { X } from "lucide-react";

const NotificationDropdown = ({ notifications, onDismiss }) => {
  return (
    <div className="absolute right-0 mt-48 w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
      <div className="p-4 border-b font-semibold text-gray-700">
        Notifications
      </div>
      <ul className="max-h-80 overflow-y-auto divide-y">
        {notifications.length === 0 ? (
          <li className="p-4 text-sm text-gray-500 text-center">
            No new notifications
          </li>
        ) : (
          notifications.map((n) => (
            <li key={n.id} className="p-4 flex justify-between items-start">
              <div className="text-sm text-gray-700">
                {n.message}
                <div className="text-xs text-gray-400 mt-1">{n.timestamp}</div>
              </div>
              <button
                onClick={() => onDismiss(n.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
