import { Bell, User } from "lucide-react";
import logo from "../../assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function NavBarExam() {
  const location = useLocation();

  return (
    <header className="bg-white shadow-md py-4 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-10">
        <img src={logo} alt="Logo" className="h-12" />
        <nav className="flex space-x-10 text-gray-700 font-semibold">
          <Link
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "text-blue-600" : "hover:text-blue-600"}
          >
            Dashboard
          </Link>
          <Link
            to="/announcements"
            className={location.pathname === "/announcements" ? "text-blue-600" : "hover:text-blue-600"}
          >
            Announcements
          </Link>
          <Link
            to="/exams"
            className={location.pathname.startsWith("/exams") ? "text-blue-600" : "hover:text-blue-600"}
          >
            Exam
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-6">
        <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
        <User className="h-6 w-6 text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
}

export default NavBarExam;