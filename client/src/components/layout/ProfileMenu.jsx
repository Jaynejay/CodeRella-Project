import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // or whatever key you're using
    navigate("/login");
  };

  return (
    <div className="relative">
      <img
        src="/profile-icon.png" // or use a react-icon/avatar
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
        alt="Profile"
      />
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
          >
            <FiUser className="mr-2" />
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
