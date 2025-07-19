import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarExam from '../../components/layout/NavBarExam';
import SideBarExam from '../../components/layout/SideBarExam';
import { Plus } from 'lucide-react';
import axios from '../../axios';
import PropTypes from 'prop-types';

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

export default function AssignedCourses() {
  const navigate = useNavigate();
  const [assignedCourses, setAssignedCourses] = useState(() => {
    const data = localStorage.getItem('assignedCourses');
    return data ? JSON.parse(data) : [];
  });
  const [selectedExam] = useState(() => {
    const data = localStorage.getItem('selectedExam');
    return data ? JSON.parse(data) : null;
  });
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 2000);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const form = e.target;
    const code = form.code.value;
    const name = form.name.value;
    axios.post('/courses', { code, name }).then(res => {
      setAssignedCourses(prev => [...prev, res.data]);
      setShowAdd(false);
      showToast('Course added!', 'success');
    }).catch(() => showToast('Failed to add course', 'error'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBarExam />
      <div className="flex flex-1">
        <SideBarExam />
        <main className="flex-1 p-8" style={{ marginLeft: '18rem', marginTop: '5.5rem' }}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {selectedExam ? `${selectedExam.title} - ${selectedExam.year}` : 'Assigned Courses'}
              </h1>
              <button
                className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-800 transition"
                onClick={() => setShowAdd(true)}
              >
                Add New <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-blue-100 rounded-xl">
                <thead>
                  <tr className="text-left text-gray-700 font-semibold">
                    <th className="p-3">No.</th>
                    <th className="p-3">Course_ID</th>
                    <th className="p-3">Course Name</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedCourses.map((course, idx) => (
                    <tr
                      key={course.id}
                      className="border-b last:border-b-0 hover:bg-blue-200 transition-colors cursor-pointer"
                      onDoubleClick={() => navigate(`/subject-details/${course.id}`)}
                    >
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3 font-mono">{course.code}</td>
                      <td className="p-3">{course.name}</td>
                    </tr>
                  ))}
                  {assignedCourses.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-8 text-gray-500">No assigned courses.</td>
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