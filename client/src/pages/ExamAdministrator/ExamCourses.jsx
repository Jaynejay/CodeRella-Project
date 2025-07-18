import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import NavBarExam from '../../components/layout/NavBarExam';
import SideBarExam from '../../components/layout/SideBarExam';
import { MoreVertical, Plus } from 'lucide-react';
import axios from '../../axios';

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
  const [courses, setCourses] = useState([]);
  const [assigned, setAssigned] = useState([]); // array of course ids
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [menuOpen, setMenuOpen] = useState(null);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/exams').then(res => {
      setExams(res.data);
      if (res.data.length > 0) setSelectedExam(res.data[0]);
    });
    axios.get('/courses').then(res => setCourses(res.data));
  }, []);

  useEffect(() => {
    if (selectedExam) {
      axios.get(`/exams/${selectedExam.id}/courses`).then(res => {
        setAssigned(res.data.map(c => c.id));
      });
    }
  }, [selectedExam]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type }), 2000);
  };

  const handleAssign = (id) => {
    setAssigned(prev => [...prev, id]);
    showToast('Course assigned!', 'success');
  };
  const handleCancel = (id) => {
    setAssigned(prev => prev.filter(cid => cid !== id));
    showToast('Assignment cancelled.', 'success');
  };
  const handleAddCourse = (e) => {
    e.preventDefault();
    const form = e.target;
    const code = form.code.value;
    const name = form.name.value;
    axios.post('/courses', { code, name }).then(res => {
      setCourses(prev => [...prev, res.data]);
      setShowAdd(false);
      showToast('Course added!', 'success');
    }).catch(() => showToast('Failed to add course', 'error'));
  };
  const filteredCourses = courses.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = () => {
    if (!selectedExam) return;
    axios.post(`/exams/${selectedExam.id}/courses`, assigned)
      .then(() => {
        // Fetch assigned course objects for AssignedCourses page
        const assignedCourses = courses.filter(c => assigned.includes(c.id));
        localStorage.setItem('assignedCourses', JSON.stringify(assignedCourses));
        localStorage.setItem('selectedExam', JSON.stringify(selectedExam));
        navigate('/assigned-courses');
      })
      .catch(() => showToast('Failed to assign courses', 'error'));
  };
  const handleCancelAll = () => {
    setAssigned([]);
    showToast('All assignments cancelled.', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBarExam />
      <div className="flex flex-1">
        <SideBarExam />
        <main className="flex-1 p-8" style={{ marginLeft: '18rem', marginTop: '5.5rem' }}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <select
                  className="border rounded px-4 py-2"
                  value={selectedExam ? selectedExam.id : ''}
                  onChange={e => {
                    const exam = exams.find(ex => ex.id === Number(e.target.value));
                    setSelectedExam(exam);
                  }}
                >
                  {exams.map(exam => (
                    <option key={exam.id} value={exam.id}>{exam.title} - {exam.year}</option>
                  ))}
                </select>
              </div>
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
                        if (assigned.includes(course.id)) {
                          navigate(`/subject-details/${course.id}`);
                        }
                      }}
                      style={{ cursor: assigned.includes(course.id) ? 'pointer' : 'default' }}
                    >
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3 font-mono">{course.code}</td>
                      <td className="p-3">{course.name}</td>
                      <td className="p-3 flex items-center gap-2 relative">
                        {assigned.includes(course.id) ? (
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
            <div className="flex justify-end gap-4 mt-8">
              <button
                className="px-6 py-2 rounded bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400"
                onClick={handleCancelAll}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-800"
                onClick={handleConfirm}
                disabled={assigned.length === 0}
              >
                Confirm
              </button>
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