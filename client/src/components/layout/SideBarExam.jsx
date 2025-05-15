import { Book, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 h-screen w-72 bg-white shadow-md flex flex-col justify-between py-6 px-4 rounded-xl z-30 mt-20">
      <div>
        <div className="mb-8">
          <Link
            to="/exam-management"
            className={`flex items-center gap-2 py-2 px-3 rounded-lg ${location.pathname === '/exam-management' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <Book className="w-5 h-5" />
            <span>Exam</span>
          </Link>
          <Link
            to="/uploaded-papers"
            className={`flex items-center gap-2 py-2 px-3 rounded-lg mt-2 ${location.pathname.startsWith('/uploaded-papers') ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <FileText className="w-5 h-5" />
            <span>Uploaded Papers</span>
          </Link>
        </div>
      </div>
      <div>
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-blue-700">
          <span>&larr;</span>
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;