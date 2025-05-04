// SideBar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, BookOpen, Bell, Users, CreditCard, Settings, HelpCircle } from 'lucide-react';
import PropTypes from 'prop-types'; // <-- Added this

const SideBar = ({ title = "My Subject" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { 
      label: "Subject", 
      icon: <FileText size={20} className="mr-2" />, 
      path: "/subjects",
      active: location.pathname.includes('/subjects')
    },
    { 
      label: "Courses", 
      icon: <BookOpen size={20} className="mr-2" />, 
      path: "/courses",
      active: location.pathname.includes('/courses')
    },
    { 
      label: "Announcements", 
      icon: <Bell size={20} className="mr-2" />, 
      path: "/announcements",
      active: location.pathname.includes('/announcements')
    },
    { 
      label: "Users", 
      icon: <Users size={20} className="mr-2" />, 
      path: "/users",
      active: location.pathname.includes('/users')
    },
    { 
      label: "Payments", 
      icon: <CreditCard size={20} className="mr-2" />, 
      path: "/payments",
      active: location.pathname.includes('/payments')
    },
    { 
      label: "Settings", 
      icon: <Settings size={20} className="mr-2" />, 
      path: "/settings",
      active: location.pathname.includes('/settings')
    },
    { 
      label: "Help", 
      icon: <HelpCircle size={20} className="mr-2" />, 
      path: "/help",
      active: location.pathname.includes('/help')
    }
  ];

  const visibleMenuItems = title === "My Subject" 
    ? menuItems.filter(item => item.label === "Subject") 
    : menuItems;

  return (
    <div className="w-48 bg-white h-screen shadow-lg relative">
      <div className="p-4">
        <h2 className="font-bold mb-6">{title}</h2>
        <ul>
          {visibleMenuItems.map((item, index) => (
            <li className="mb-2" key={index}>
              <Link 
                to={item.path} 
                className={`flex items-center px-4 py-2 rounded ${
                  item.active 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-4 left-4">
        <button 
          className="flex items-center text-gray-600 hover:text-blue-800"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="mr-2" size={20} />
          <span>
            Back to<br />
            Dashboard
          </span>
        </button>
      </div>
    </div>
  );
};

// ✅ Added PropTypes validation
SideBar.propTypes = {
  title: PropTypes.string
};

export default SideBar;
