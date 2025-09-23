import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import SideBarSubject from '../components/layout/SideBarSubject';
import AddSubject     from './AddSubject';
import UpdateSubject  from './UpdateSubject';
import DeleteSubject  from './DeleteSubject';

const baseUrl = 'http://localhost:8080/api';

export default function SubjectOverview() {
  const { sNo: courseId } = useParams();  // from route param /courses/:sNo
  const navigate = useNavigate();

  const [courseTitle, setCourseTitle] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [courseCode,  setCourseCode]  = useState('');
  const [subjects,    setSubjects]    = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  const [showAdd,    setShowAdd]    = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected,   setSelected]   = useState(null);

  // NEW: which subject's 3-dot menu is open (store subject code)
  const [openMenuFor, setOpenMenuFor] = useState(null);

  const fetchSubjects = useCallback(async () => {
    if (!courseId) {
      alert("Invalid course ID");
      return;
    }

    try {
      const [courseRes, subjRes] = await Promise.all([
        axios.get(`${baseUrl}/courses/${courseId}`),
        axios.get(`${baseUrl}/courses/${courseId}/subjects`)
      ]);
      setCourseTitle(courseRes.data.title);
      setCourseCode(courseRes.data.code);
      setCourseLevel(courseRes.data.level);
      setSubjects(subjRes.data);
      setAllSubjects(subjRes.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load subjects');
    }
  }, [courseId]);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSubjects(allSubjects.filter((s) =>
      (s.title || '').toLowerCase().includes(keyword) ||
      (s.code || '').toLowerCase().includes(keyword)
    ));
  };

  const handleAdd = async ({ subjectCode, subjectName, files }) => {
    const fd = new FormData();
    fd.append('code', subjectCode);
    fd.append('title', subjectName);
    if (files.length) fd.append('image', files[0]);

    await axios.post(`${baseUrl}/courses/${courseId}/subjects`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    fetchSubjects();
    setShowAdd(false);
  };

  const handleUpd = async (form) => {
    const fd = new FormData();
    fd.append('title', form.subjectName);
    if (form.files.length) fd.append('image', form.files[0]);

    await axios.put(
      `${baseUrl}/courses/${courseId}/subjects/${form.subjectCode}`,
      fd,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    fetchSubjects();
    setShowUpdate(false);
  };

  const handleDel = async ({ subjectCode }) => {
    try {
      const code = encodeURIComponent(String(subjectCode).trim());
      await axios.delete(`${baseUrl}/courses/${courseId}/subjects/${code}`);
      await fetchSubjects(); // 204 No Content on success
      setShowDelete(false);
    } catch (err) {
      console.error("Delete failed:", err?.response || err);
      alert(
        err?.response?.data?.message ||
        err?.message ||
        "Delete failed. Check the browser Network tab and server logs."
      );
    }
  };

  // Close the menu when clicking outside or pressing ESC
  useEffect(() => {
    const onDocClick = (e) => {
      // If click isn't inside any action area, close
      if (!e.target.closest('[data-action-area="true"]')) {
        setOpenMenuFor(null);
      }
    };
    const onEsc = (e) => {
      if (e.key === 'Escape') setOpenMenuFor(null);
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 pt-24">
        <SideBarSubject title="My Subject" />
        <main className="flex-1 px-6">
          <section className="mx-auto max-w-5xl">
            <h1 className="mb-4 text-2xl font-semibold">Subject Overview</h1>
            <p className="mb-8 font-medium text-blue-900">
              {courseCode} – {courseTitle || '…'}
            </p>

            {/* Top bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="relative w-64">
                <label htmlFor="subjectSearch" className="sr-only">Search subject</label>
                <input
                  id="subjectSearch"
                  name="subjectSearch"
                  aria-label="Search subject"
                  type="text"
                  placeholder="Search subject"
                  className="w-full rounded-full bg-gray-200/60 pl-10 pr-4 py-2 text-sm focus:outline-none"
                  onChange={handleSearch}
                />
                <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-900"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M10 17a7 7 0 100-14 7 7 0 000 14z" />
                </svg>
              </div>

              <button
                onClick={() => setShowAdd(true)}
                className="rounded-full bg-[#0B1F7F] px-6 py-2 text-sm font-semibold text-white hover:bg-[#11299f]"
              >
                Add subject
              </button>
            </div>

            {/* Subject list */}
            <div className="rounded-xl bg-white p-6 shadow-inner ring-1 ring-gray-200 max-h-[60vh] overflow-y-auto">
              {subjects.map((s, idx) => (
                <div
                  key={s.code}
                  onClick={() => s.code && navigate(`/subject/${s.code}`)}
                  className="mb-3 flex items-center justify-between rounded-full bg-blue-100 px-4 py-3 last:mb-0 hover:bg-blue-200 cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-700">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-bold">{s.code}</span>
                    <span className="text-sm">{s.title}</span>
                  </div>

                  {/* Actions (3-dot button + controlled menu) */}
                  <div
                    className="relative shrink-0"
                    data-action-area="true"
                    onClick={(e) => e.stopPropagation()} // prevent row navigation when clicking button/menu
                  >
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={openMenuFor === s.code}
                      aria-label={`Actions for ${s.code}`}
                      className="rounded-full p-1 hover:bg-blue-300/40"
                      onClick={() =>
                        setOpenMenuFor((prev) => (prev === s.code ? null : s.code))
                      }
                    >
                      <svg viewBox="0 0 20 20" className="h-5 w-5 fill-[#0B1F7F]">
                        <circle cx="10" cy="4" r="1.5" />
                        <circle cx="10" cy="10" r="1.5" />
                        <circle cx="10" cy="16" r="1.5" />
                      </svg>
                    </button>

                    {openMenuFor === s.code && (
                      <div
                        role="menu"
                        className="absolute right-0 top-8 z-10 min-w-[160px] rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5"
                      >
                        <button
                          role="menuitem"
                          onClick={() => {
                            setSelected(s);
                            setShowDelete(true);
                            setOpenMenuFor(null);
                          }}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          Delete subject
                        </button>
                        <button
                          role="menuitem"
                          onClick={() => {
                            setSelected(s);
                            setShowUpdate(true);
                            setOpenMenuFor(null);
                          }}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          Update subject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Modals */}
      {showAdd && (
        <AddSubject
          onClose={() => setShowAdd(false)}
          onSubmit={handleAdd}
          initialCourseLevel={courseLevel}
          initialCourseName={courseTitle}
          initialCourseCode={courseCode}
        />
      )}

      {showUpdate && selected && (
        <UpdateSubject
          onClose={() => setShowUpdate(false)}
          onSubmit={handleUpd}
          initialData={{
            courseCode: courseId,
            subjectCode: selected.code,
            subjectName: selected.title,
            newLevel: '',
            newCourseName: '',
            files: []
          }}
        />
      )}

      {showDelete && selected && (
        <DeleteSubject
          isOpen={true}
          onClose={() => setShowDelete(false)}
          onDelete={handleDel}
          initialData={{
            courseCode: courseId,
            subjectCode: selected.code,
            subjectName: selected.title
          }}
        />
      )}
    </>
  );
}
