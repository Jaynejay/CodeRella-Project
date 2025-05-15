import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import NavBarExam from '../../components/layout/NavBarExam';
import SideBarExam from '../../components/layout/SideBarExam';
import { MoreVertical, Plus } from 'lucide-react';

const mockExam = {
  id: 1,
  title: 'Technical College Final Examination',
  year: 2024,
};

const mockCourses = [
  { id: 1, code: 'ETC_05', name: 'Engineering Draughtsmanship', assigned: true },
  { id: 2, code: 'A01S003F4.3', name: 'Field Assistant (Agriculture)', assigned: true },
  { id: 3, code: '45A01T03F6.1', name: 'Agriculture Production Technology', assigned: false },
  { id: 4, code: '3D15T001P5.1', name: 'Food Technology', assigned: false },
  { id: 5, code: 'A01S018F4.0', name: 'Plant Tissue Culture Laboratory Assistant', assigned: false },
  { id: 6, code: '5O5S001F5.2', name: 'Automobile Air CC', assigned: false },
  { id: 7, code: 'A01S003F4.3', name: 'Field Assistant', assigned: false },
  { id: 8, code: 'G5O5O06F3.3', name: 'Motorcycle Mechanic', assigned: false },
];

function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
         onClick={onClose}>
      {message}
    </div>
  );
}
Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func
};

export default function ExamCourses() {
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState(mockCourses);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [menuOpen, setMenuOpen] = useState(null); // course id for open menu
  const navigate = useNavigate();

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type }), 2000);
  };

  const handleAssign = (id) => {
    setCourses(courses.map(c => c.id === id ? { ...c, assigned: true } : c));
    showToast('Course assigned!', 'success');
  };
  const handleCancel = (id) => {
    setCourses(courses.map(c => c.id === id ? { ...c, assigned: false } : c));
    showToast('Assignment cancelled.', 'success');
  };
  const handleAddCourse = (e) => {
    e.preventDefault();
    setShowAdd(false);
    showToast('Course added!', 'success');
  };
  const filteredCourses = courses.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBarExam />
      <div className="flex flex-1">
        <SideBarExam />
        <main className="flex-1 p-8" style={{ marginLeft: '18rem', marginTop: '5.5rem' }}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {mockExam.title} - {mockExam.year}
              </h1>
              <button
                className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition"
                onClick={() => setShowAdd(true)}
              >
                Add New <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-72">
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full rounded-full border px-4 py-2 pl-10 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-blue-100 rounded-xl">
                <thead>
                  <tr className="text-left text-gray-700 font-semibold">
                    <th className="p-3">No.</th>
                    <th className="p-3">Course_ID</th>
                    <th className="p-3">Course Name</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course, idx) => (
                    <tr
                      key={course.id}
                      className="border-b last:border-b-0"
                      onDoubleClick={() => {
                        if (course.assigned) {
                          navigate(`/exam-management/${mockExam.id}/course/${course.id}`);
                        }
                      }}
                      style={{ cursor: course.assigned ? 'pointer' : 'default' }}
                    >
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3 font-mono">{course.code}</td>
                      <td className="p-3">{course.name}</td>
                      <td className="p-3 flex items-center gap-2 relative">
                        {course.assigned ? (
                          <button
                            className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-300"
                            onClick={() => handleCancel(course.id)}
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-700"
                            onClick={() => handleAssign(course.id)}
                          >
                            Assign
                          </button>
                        )}
                        <button
                          className="ml-2 p-1 rounded-full hover:bg-gray-200"
                          onClick={() => setMenuOpen(menuOpen === course.id ? null : course.id)}
                        >
                          <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>
                        {menuOpen === course.id && (
                          <div className="absolute right-0 top-8 bg-white border rounded shadow-lg z-10 w-32 py-1">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                              onClick={() => { setMenuOpen(null); showToast('Edit not implemented', 'error'); }}
                            >
                              Edit course
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              onClick={() => { setMenuOpen(null); showToast('Delete not implemented', 'error'); }}
                            >
                              Delete course
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredCourses.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-gray-500">No courses found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Add Course Modal */}
          {showAdd && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Course</h2>
                <form onSubmit={handleAddCourse} className="space-y-4">
                  <input
                    name="code"
                    className="mb-2 w-full border p-2 rounded"
                    placeholder="Course Code"
                    required
                  />
                  <input
                    name="name"
                    className="mb-2 w-full border p-2 rounded"
                    placeholder="Course Name"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: toast.type })} />
        </main>
      </div>
    </div>
  );
} 