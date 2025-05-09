// Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

import logo from '../../assets/images/logo.svg'; 
const Navbar = () => {
  const location = useLocation();
  const [notifications] = useState(3); // <-- Removed 'setNotifications'

  return (
    <header className="fixed top-0 inset-x-0 bg-white shadow z-50 h-16">
      <div className="max-w-7xl mx-auto px-10 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/dashboard">
            <img
                src={logo} 
                alt="DTET Logo" 
              className="h-12 mr-4"
            />
          </Link>
          
        </div>
        
        <nav className="flex ml-8">
          <ul className="flex">
            <li className="mx-8">
              <Link 
                to="/dashboard" 
                className={`${location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
              >
                Dashboard
              </Link>
            </li>
            <li className="mx-8">
              <Link 
                to="/announcements" 
                className={`${location.pathname === '/announcements' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
              >
                Announcements
              </Link>
            </li>
            <li className="mx-8">
              <Link 
                to="/courses" 
                className={`${location.pathname === '/courses' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
              >
                Courses
              </Link>
            </li>
            <li className="mx-8">
              <Link 
                to="/users" 
                className={`${location.pathname === '/users' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
              >
                User Accounts
              </Link>
            </li>
            <li className="mx-8">
              <Link 
                to="/payments" 
                className={`${location.pathname === '/payments' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-600 hover:border-b-2 hover:border-blue-600`}
              >
                Payments
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center">
          <button className="mx-2 relative">
            <div className={`absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full ${notifications > 0 ? 'block' : 'hidden'}`}></div>
            <Bell className="h-6 w-6" />
          </button>
          <Link to="/profile" className="ml-4">
            <User className="h-8 w-8" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
