// AppLayout.jsx - A layout component that combines NavBar and SideBar
import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';
import SideBar from './SideBar';
import PropTypes from 'prop-types'; // <-- Added this

const AppLayout = ({ sidebarTitle }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="flex">
        <SideBar title={sidebarTitle} />
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// ✅ Added PropTypes validation
AppLayout.propTypes = {
  sidebarTitle: PropTypes.string
};

export default AppLayout;
