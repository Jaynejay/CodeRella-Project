import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import axios from "../../axios"; // Adjust the import path as necessary
import ConfirmModal from "../ConfirmModal";
import { useUser } from "../../context/UserContext";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { user, imageUrl } = useUser();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      // Clear all auth-related items from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("firstLogin");

      // Optionally clear everything
      // localStorage.clear();

      // Redirect to login page
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="relative">
      <img
        src={imageUrl} // or use a react-icon/avatar
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
        alt="Profile"
      />
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
          <button
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
          >
            <FiUser className="mr-2" />
            Profile
          </button>
          <button
            onClick={() => {
              setOpen(false);
              setShowConfirm(true); // Show modal instead of logging out directly
            }}
            className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
          >
            <FiLogOut className="mr-2" />
            Logout
          </button>
        </div>
      )}

      {showConfirm && (
        <ConfirmModal
          title="Confirm Logout"
          message="Are you sure you want to log out?"
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            handleLogout();
          }}
        />
      )}
    </div>
  );
}
