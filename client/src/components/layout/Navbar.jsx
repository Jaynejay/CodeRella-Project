import { Bell, User } from "lucide-react"; // You can install lucide-react for icons if not already
import logo from "../../assets/images/logo.svg";

function Navbar() {
  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <img src={logo} alt="Logo" className="h-12" />
        <nav className="flex space-x-6 text-gray-700 font-semibold">
          <a href="#" className="hover:text-blue-600">
            Dashboard
          </a>
          <a href="#" className="hover:text-blue-600">
            Announcement
          </a>
          <a href="#" className="hover:text-blue-600">
            Users
          </a>
          <a href="#" className="hover:text-blue-600">
            Pending Request
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
        <User className="h-6 w-6 text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
}

export default Navbar;
