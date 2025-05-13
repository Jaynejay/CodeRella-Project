import React, { useEffect, useState } from "react";
import AddExamCard from "../../components/ExamAdminDashboard/AddExamCard";
import ExamCard from "../../components/ExamAdminDashboard/ExamCard";
import axios from "axios";

export default function DashboardPage() {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ code: "", title: "", year: "", image: "" });
  const [formError, setFormError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchExams = () => {
    setLoading(true);
    axios.get("http://localhost:8080/api/exams")
      .then(res => {
        setExams(res.data);
        setFilteredExams(res.data);
      })
      .catch(() => {
        setExams([]);
        setFilteredExams([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchExams();
  }, []);

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

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
      setForm({ code: "", title: "", year: "", image: "" });
      fetchExams();
    } catch {
      setFormError("Failed to add exam.");
    }
  };

  return (
    <div className="p-6">
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
            <ExamCard key={exam.code} {...exam} />
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
                value={form.year || ""}
                onChange={handleFormChange}
                className="mb-2 w-full border p-2 rounded"
                placeholder="Year (e.g., 2024)"
                required
                type="number"
                min="2000"
                max="2100"
              />
              <input
                name="image"
                value={form.image}
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
    </div>
  );
} 