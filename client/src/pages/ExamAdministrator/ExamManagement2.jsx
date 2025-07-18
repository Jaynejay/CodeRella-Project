//for manage exams
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddExamCard from "../../components/ExamAdminDashboard/AddExamCard";
import ExamCard from "../../components/ExamAdminDashboard/ExamCard";
import axios from "../../axios";
import NavBarExam from "../../components/layout/NavBarExam";
import SideBarExam from "../../components/layout/SideBarExam";
import PropTypes from 'prop-types';

/**
 * Toast Component
 * Displays temporary success/error messages to the user
 */
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

/**
 * DashboardPage Component
 * Main component that manages the exam dashboard functionality
 */
export default function DashboardPage() {
  // State management for exams and UI
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ code: "", title: "", year: "", imageUrl: "" });
  const [formError, setFormError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editExam, setEditExam] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const navigate = useNavigate();

  // Shows toast message for 2.5 seconds
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type }), 2500);
  };

  // Fetches all exams from the API
  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/exams");
      console.log("Fetched exams:", response.data);
      setExams(response.data);
      setFilteredExams(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
      setExams([]);
      setFilteredExams([]);
      showToast('Failed to fetch exams', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // Filters exams based on search query
  const handleSearch = () => {
    const filtered = exams.filter(exam => 
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExams(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handles form input changes
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Adds a new exam
  const handleAddExam = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.code || !form.title || !form.year) {
      setFormError("All fields are required.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/exams", form);
      setShowAddForm(false);
      setForm({ code: "", title: "", year: "", imageUrl: "" });
      fetchExams();
      showToast('Exam added successfully!', 'success');
    } catch (error) {
      console.error("Error adding exam:", error);
      setFormError("Failed to add exam.");
      showToast('Failed to add exam', 'error');
    }
  };

  // Prepares exam for editing
  const handleEditExam = (exam) => {
    setEditExam(exam);
    setForm({
      code: exam.code,
      title: exam.title,
      year: exam.year,
      imageUrl: exam.imageUrl || exam.image_url || ""
    });
    setShowAddForm(false);
  };

  // Updates an existing exam
  const handleUpdateExam = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.code || !form.title || !form.year) {
      setFormError("All fields are required.");
      return;
    }
    try {
      await axios.put(`http://localhost:8080/api/exams/${editExam.id}`, form);
      setEditExam(null);
      setForm({ code: "", title: "", year: "", imageUrl: "" });
      fetchExams();
      showToast('Exam updated successfully!', 'success');
    } catch (error) {
      console.error("Error updating exam:", error);
      setFormError("Failed to update exam.");
      showToast('Failed to update exam', 'error');
    }
  };

  // Deletes an exam after confirmation
  const handleDeleteExam = async (id) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await axios.delete(`http://localhost:8080/api/exams/${id}`);
        fetchExams();
        showToast('Exam deleted successfully!', 'success');
      } catch {
        showToast('Failed to delete exam', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBarExam />
      <div className="flex flex-1">
        <SideBarExam />
        <main className="flex-1 p-6" style={{ marginLeft: '18rem', marginTop: '5.5rem' }}>
          <div className="mb-6">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full rounded-lg border px-4 py-2 pl-10 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </button>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-10">Loading exams...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <AddExamCard onClick={() => setShowAddForm(true)} />
              {filteredExams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  code={exam.code}
                  title={exam.title}
                  year={exam.year}
                  imageUrl={exam.imageUrl || exam.image_url}
                  onEdit={() => handleEditExam(exam)}
                  onDelete={() => handleDeleteExam(exam.id)}
                  onClick={() => navigate(`/exam-management/${exam.id}`)}
                />
              ))}
              {filteredExams.length === 0 && !loading && (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No exams found matching your search.
                </div>
              )}
            </div>
          )}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add Exam</h2>
                <form onSubmit={handleAddExam} className="space-y-4">
                  <input
                    name="code"
                    value={form.code}
                    onChange={handleFormChange}
                    className="mb-2 w-full border p-2 rounded"
                    placeholder="Exam Code"
                    required
                  />
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    className="mb-2 w-full border p-2 rounded"
                    placeholder="Title"
                    required
                  />
                  <input
                    name="year"
                    value={form.year}
                    onChange={handleFormChange}
                    className="mb-2 w-full border p-2 rounded"
                    placeholder="Year (e.g., 2024)"
                    required
                    type="number"
                    min="2000"
                    max="2100"
                  />
                  <input
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleFormChange}
                    className="mb-2 w-full border p-2 rounded"
                    placeholder="Image URL (optional)"
                  />
                  {formError && <div className="text-red-500 text-sm">{formError}</div>}
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {editExam && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Exam</h2>
                <form onSubmit={handleUpdateExam} className="space-y-4">
                  <input
                    name="code"
                    value={form.code}
                    onChange={handleFormChange}
                    className="mb-2 w-full border p-2 rounded"
                    placeholder="Exam Code"
                    required
                  />
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    className="mb-2 w-full border p-2 rounded"
                    placeholder="Title"
                    required
                  />
                  <input
                    name="year"
                    value={form.year}
                    onChange={handleFormChange}
                    className="mb-2 w-full border p-2 rounded"
                    placeholder="Year (e.g., 2024)"
                    required
                    type="number"
                    min="2000"
                    max="2100"
                  />
                  <input
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleFormChange}
                    className="mb-2 w-full border p-2 rounded"
                    placeholder="Image URL (optional)"
                  />
                  {formError && <div className="text-red-500 text-sm">{formError}</div>}
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setEditExam(null)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
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