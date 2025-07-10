/**
 * NavBarExam Component
 * 
 * The main navigation bar for the exam management section of the application.
 * Features:
 * - Displays the application logo
 * - Provides navigation links to main sections
 * - Shows notification and user profile icons
 * - Highlights the active navigation item
 * - Fixed position at the top of the screen
 */

import { Bell, User } from "lucide-react";
import logo from "../../assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function NavBarExam() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md py-4 px-8 flex items-center justify-between z-40 w-full">
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
            to="/exam-management"
            className={location.pathname === "/exam-management" ? "text-blue-600" : "hover:text-blue-600"}
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