// src/components/layout/NavbarCourse.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import logo from '../../assets/images/logo.svg';

const NavbarCourse = () => {
  const location = useLocation();
  const [notifications] = useState(3);

  return (
    <header className="fixed top-5 left-5 right-5 bg-white shadow z-50 rounded-b-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-5 py-2">
        <div className="flex items-center">
          <img src={logo} alt="DTET Logo" className="h-12 mr-4" />
        </div>

        <nav className="flex space-x-12 ml-8">
          <Link
            to="/dashboard"
            className={`${location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
          >
            Dashboard
          </Link>
          <Link
            to="/announcements"
            className={`${location.pathname === '/announcements' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
          >
            Announcements
          </Link>
          <Link
            to="/courses"
            className={`${location.pathname === '/courses' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
          >
            Courses
          </Link>

          <Link
              to="/payments"
              className={`${location.pathname === '/payments' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
          >
            Payments
          </Link>
        </nav>

        {/* ✅ Updated icons section with notification dot and profile */}
        <div className="flex items-center">
          <button className="mx-2 relative text-gray-600 hover:text-blue-600">
            <div className={`absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full ${notifications > 0 ? 'block' : 'hidden'}`}></div>
            <Bell className="h-6 w-6" />
          </button>
          <Link to="/profile" className="ml-4">
            <User className="h-8 w-8 text-gray-700 hover:text-blue-600" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavbarCourse;
