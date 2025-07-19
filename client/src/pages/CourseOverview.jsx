// src/pages/CourseOverview.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";

import CourseSidebar from "../components/layout/CourseSidebar";
import AddingCourse  from "./AddingCourse";
import UpdateCourse  from "./UpdateCourse";
import DeleteCourse  from "./DeleteCourse";
import addPlus       from "../assets/images/Addcourseplus.svg";

export default function CourseOverview() {
  const navigate = useNavigate();

  /* ─── Search & Filter State ───────────────────── */
  const [searchTerm, setSearchTerm] = useState("");
  const [category,  setCategory]  = useState("All");
  const categories = ["All", "final", "5s1", "5s2", "5s3", "6s1", "6s2"];

  /* ─── Local state ────────────────────────────── */
  const [courses,     setCourses]     = useState([]);
  const [showAdd,     setShowAdd]     = useState(false);
  const [editCourse,  setEditCourse]  = useState(null);
  const [removeCourse,setRemoveCourse]= useState(null);
  const [menuOpen,    setMenuOpen]    = useState(null);
  const [error,       setError]       = useState(null);
  const [loading,     setLoading]     = useState(true);

  /* ─── Fetch courses on mount ─────────────────── */
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses")
      .then((res) => setCourses(res.data))
      .catch(() => setError("Failed to load courses"))
      .finally(() => setLoading(false));
  }, []);

  /* ─── Filtered list ──────────────────────────── */
  const filteredCourses = courses
    .filter(c =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(c => category === "All" || c.term === category);

  /* ─── Create / Update / Delete handlers ─────────────────── */
  const handleAddSubmit = async (data) => {
    try {
      const form = new FormData();
      form.append("sNo",   data.sNo);
      form.append("code",  data.courseCode);
      form.append("title", data.courseName);
      form.append("level", data.level);
      if (data.courseImage) form.append("image", data.courseImage);

      const res = await axios.post(
        "http://localhost:8080/api/courses",
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setCourses(prev => [
        ...prev,
        { ...res.data, img: data.courseImage ? URL.createObjectURL(data.courseImage) : undefined }
      ]);
    } catch {
      setError("Failed to add course");
    } finally {
      setShowAdd(false);
    }
  };

  const handleUpdateSubmit = async (id, data) => {
    try {
      const form = new FormData();
      form.append("code",  data.courseCode);
      form.append("title", data.courseName);
      form.append("level", data.Level);
      if (data.courseImage) form.append("image", data.courseImage);

      const res = await axios.put(
        `http://localhost:8080/api/courses/${id}`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setCourses(prev =>
        prev.map(c =>
          c.id === res.data.id
            ? { ...res.data, img: data.courseImage ? URL.createObjectURL(data.courseImage) : c.img }
            : c
        )
      );
    } catch {
      setError("Failed to update course");
    } finally {
      setEditCourse(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/courses/${id}`);
      setCourses(prev => prev.filter(c => c.id !== id));
    } catch {
      setError("Failed to delete course");
    } finally {
      setRemoveCourse(null);
    }
  };

  /* ─── Render ─────────────────────────────────── */
  if (loading) return <div className="p-6">Loading…</div>;
  if (error)   return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <CourseSidebar />

      <main className="flex-1 overflow-y-auto bg-gray-100">
        <div className="mx-auto mt-24 w-[90%] max-w-6xl rounded-xl bg-white p-6 shadow">

          {/* ── Search & Category Bar ── */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-semibold">Courses</h1>
            <div className="flex flex-1 items-center gap-3">
              {/* Search */}
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1">
                <Search size={16} className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search courses…"
                  className="bg-transparent border-none focus:outline-none flex-1 text-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Category */}
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Grid of Cards ── */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Add Course card */}
            <div
              onClick={() => setShowAdd(true)}
              className="cursor-pointer flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-6 hover:shadow-md"
            >
              <img src={addPlus} alt="Add Course" className="h-12 w-12" />
              <span className="text-sm font-medium">Add Course</span>
            </div>

            {/* Course cards */}
            {filteredCourses.map(c => (
              <div
                key={c.id}
                className="relative h-60 overflow-hidden rounded-lg bg-white shadow hover:shadow-md"
              >
                <div
                  role="button"
                  className="h-2/3 relative cursor-pointer"
                  onClick={() => navigate(`/courses/${c.code}`)}
                >
                  <img
                    src={c.img || `data:${c.imageType};base64,${c.imageData}`}
                    alt={c.title}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-blue-800 px-2 py-0.5 text-xs font-semibold text-white rounded">
                    {c.level}
                  </span>
                </div>

                <div className="p-3 flex flex-col justify-between h-1/3">
                  <div>
                    <p className="text-xs text-gray-500 truncate">{c.code}</p>
                    <h3 className="text-sm font-medium truncate">{c.title}</h3>
                  </div>

                  {/* kebab menu */}
                  <div className="relative">
                    <button
                      onClick={() => setMenuOpen(menuOpen === c.id ? null : c.id)}
                      className="absolute bottom-0 right-0 p-1"
                    >
                      ⋮
                    </button>
                    {menuOpen === c.id && (
                      <div className="absolute bottom-6 right-0 z-10 w-36 rounded-md bg-white shadow-lg">
                        <button
                          onClick={() => { setEditCourse(c); setMenuOpen(null); }}
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          Edit course
                        </button>
                        <button
                          onClick={() => { setRemoveCourse(c); setMenuOpen(null); }}
                          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          Delete course
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modals */}
      {showAdd && (
        <AddingCourse
          isOpen={true}
          onClose={() => setShowAdd(false)}
          onSubmit={handleAddSubmit}
        />
      )}
      {editCourse && (
        <UpdateCourse
          isOpen={true}
          course={editCourse}
          onClose={() => setEditCourse(null)}
          onSubmit={data => handleUpdateSubmit(editCourse.id, data)}
        />
      )}
      {removeCourse != null && (
  <DeleteCourse
    isOpen={true}
    course={removeCourse}
    onClose={() => setRemoveCourse(null)}
    onDelete={handleDelete}
  />
)}

    </div>
  );
}
