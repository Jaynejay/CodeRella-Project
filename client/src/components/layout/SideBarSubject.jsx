// src/components/layout/SideBar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import PropTypes from 'prop-types';

const SideBarSubject = ({ title = "My Subject" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname.includes('/subjects');

  return (
    <div className="w-52 bg-white h-screen shadow-md pt-20 fixed left-0 top-3 z-40">
      <div className="p-4">
        <h2 className="font-bold text-sm text-gray-700 mb-4">{title}</h2>
        <ul>
          <li className="mb-2">
            <Link
              to="/subjects"
              className={`flex items-center px-4 py-2 rounded text-sm ${
                isActive
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText size={20} className="mr-2" />
              Subject
            </Link>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-6 left-4">
        <button
          className="flex items-center text-sm text-gray-600 hover:text-blue-800"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="mr-2" size={25} />
          <span>Back to<br />Dashboard</span>
        </button>
      </div>
    </div>
  );
};

SideBarSubject.propTypes = {
  title: PropTypes.string
};

export default SideBarSubject;
