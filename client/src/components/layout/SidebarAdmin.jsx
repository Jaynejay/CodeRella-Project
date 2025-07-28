import { NavLink } from "react-router-dom";
import { FiUser, FiBookOpen, FiFileText, FiDollarSign } from "react-icons/fi";

export default function SidebarAdmin() {
  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm">
      <div className="p-6 border-b">
        <h1 className="text-lg font-semibold text-gray-700">User Accounts</h1>
      </div>
      <nav className="flex flex-col p-4 space-y-2 text-gray-700 text-sm">
        <NavLink
          to="/admin/paper-setters"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-md hover:bg-blue-100 transition hover:text-blue-700 ${
              isActive ? "bg-blue-100 font-medium text-blue-700" : ""
            }`
          }
        >
          <FiFileText className="mr-3" />
          Paper Setter
        </NavLink>

        <NavLink
          to="/admin/exam-admins"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-md hover:bg-blue-100 transition hover:text-blue-700 ${
              isActive ? "bg-blue-100 font-medium text-blue-700" : ""
            }`
          }
        >
          <FiUser className="mr-3" />
          Exam Administrator
        </NavLink>

        <NavLink
          to="/admin/course-admins"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-md hover:bg-blue-100 transition hover:text-blue-700 ${
              isActive ? "bg-blue-100 font-medium text-blue-700" : ""
            }`
          }
        >
          <FiBookOpen className="mr-3" />
          Course Administrator
        </NavLink>

        <NavLink
          to="/admin/payment-coordinators"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-md hover:bg-blue-100 transition hover:text-blue-700 ${
              isActive ? "bg-blue-100 font-medium text-blue-700" : ""
            }`
          }
        >
          <FiDollarSign className="mr-3" />
          Payment Coordinator
        </NavLink>
      </nav>
    </div>
  );
}
