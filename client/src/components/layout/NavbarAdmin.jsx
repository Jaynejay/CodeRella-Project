import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, User } from "lucide-react";
import ProfileMenu from "./ProfileMenu";

import logo from "../../assets/images/logo.svg";
const NavbarAdmin = () => {
  const location = useLocation();
  const [notifications] = useState(3); // <-- Removed 'setNotifications'

  return (
    <header className="fixed top-0 inset-x-0 bg-white shadow z-50 h-16">
      <div className="max-w-7xl mx-auto px-10 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/admin">
            <img src={logo} alt="DTET Logo" className="h-12 mr-4" />
          </Link>
        </div>

        <nav className="flex ml-8">
          <ul className="flex">
            <li className="mx-8">
              <Link
                to="/admin"
                className={`${
                  location.pathname === "/admin"
                    ? "text-blue-600"
                    : "text-gray-800"
                } hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
              >
                Dashboard
              </Link>
            </li>
            <li className="mx-8">
              <Link
                to="/announcements"
                className={`${
                  location.pathname === "/announcements"
                    ? "text-blue-600"
                    : "text-gray-800"
                } hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
              >
                Announcements
              </Link>
            </li>

            <li className="mx-8">
              <Link
                to="/admin/user-accounts"
                className={`${
                  location.pathname === "/admin/user-accounts"
                    ? "text-blue-600"
                    : "text-gray-800"
                } hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
              >
                User Accounts
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          <button className="mx-2 relative">
            <div
              className={`absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full ${
                notifications > 0 ? "block" : "hidden"
              }`}
            ></div>
            <Bell className="h-6 w-6" />
          </button>
          <div className="ml-4">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarAdmin;
