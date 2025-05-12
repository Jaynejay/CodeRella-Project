// src/components/CourseSidebar.jsx
import { NavLink, useNavigate } from 'react-router-dom';

/** Shared classes for the two nav links */
const linkBase =
  'flex items-center gap-3 px-6 py-3 rounded-lg transition-colors';

export default function CourseSidebar() {
  const navigate = useNavigate();

  return (
    /*  Stick the sidebar immediately below the fixed nav bar  */
    <aside className="w-56 shrink-0 bg-white border-r sticky top-[var(--nav-h)] flex flex-col h-[calc(100vh-var(--nav-h))]">
      {/* ------ top section ------ */}
      <div className="px-6 py-12 border-b">
        
      </div>

      {/* ------ main nav links ------ */}
      <nav className="flex-1 py-4 space-y-1">
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'bg-blue-100 text-blue-700 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <span className="material-icons-outlined text-base"></span>
          Course
        </NavLink>

        <NavLink
          to="/exams"
          className={({ isActive }) =>
            `${linkBase} ${
              isActive
                ? 'bg-blue-100 text-blue-700 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`
          }
        >
          <span className="material-icons-outlined text-base"></span>
          Exam
        </NavLink>
      </nav>

      {/* ------ bottom “back” link ------ */}
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 px-6 py-3 text-sm text-gray-600 hover:text-gray-800"
      >
        <span className="material-icons-outlined text-base"></span>
        Back to Dashboard
      </button>
    </aside>
  );
}
