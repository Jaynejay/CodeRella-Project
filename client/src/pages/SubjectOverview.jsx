import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SideBarSubject from '../components/layout/SideBarSubject';
import AddSubject from './AddSubject';
import UpdateSubject from './UpdateSubject';
import DeleteSubject from './DeleteSubject';

// Import initialCourses from CourseOverview
import { initialCourses } from './CourseOverview';

// Helper function to find the course by code
const getCourseTitleByCode = (code) => {
  const course = initialCourses.find((c) => c.code === code);
  return course ? course.title : 'Unknown Course';
};

const subjectData = {
  'A01S003F4.3': [
    { code: 'FAS101', title: 'Soil Fundamentals' },
    { code: 'FAS102', title: 'Crop Protection 1' },
    { code: 'FAS103', title: 'Irrigation Basics' },
  ],
  '3D15T001P5-1': [
    { code: 'NDF201', title: 'Food Chemistry' },
    { code: 'NDF202', title: 'Processing Equipment' },
    { code: 'NDF203', title: 'Quality Assurance' },
  ],
};

const SubjectOverview = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const [courseTitle, setCourseTitle] = useState(getCourseTitleByCode(code));
  const [subjects, setSubjects] = useState(subjectData[code] ?? []);

  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setCourseTitle(getCourseTitleByCode(code));
    setSubjects(subjectData[code] ?? []);
  }, [code]);

  const openAdd = () => setShowAdd(true);
  const openUpdate = (s) => { setSelected(s); setShowUpdate(true); };
  const openDelete = (s) => { setSelected(s); setShowDelete(true); };

  const handleAdd = ({ subjectCode, subjectName }) => {
    setSubjects((p) => [...p, { code: subjectCode, title: subjectName }]);
    setShowAdd(false);
  };

  const handleUpd = ({ subjectCode, subjectName }) => {
    setSubjects((p) =>
      p.map((x) => (x.code === subjectCode ? { ...x, title: subjectName } : x))
    );
    setShowUpdate(false);
  };

  const handleDel = ({ subjectCode }) => {
    setSubjects((p) => p.filter((x) => x.code !== subjectCode));
    setShowDelete(false);
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 pt-24">
        <SideBarSubject title="My Subject" />

        <main className="flex-1 px-6">
          <section className="mx-auto max-w-5xl">
            <h1 className="mb-4 text-2xl font-semibold">Subject Overview</h1>
            <p className="mb-8 font-medium text-blue-900">
              {code} – {courseTitle}
            </p>

            <div className="mb-6 flex items-center justify-between">
              <div className="relative w-64">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 17a7 7 0 100-14 7 7 0 000 14z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search subject"
                  className="w-full rounded-full bg-gray-200/60 pl-10 pr-4 py-2 text-sm focus:outline-none"
                />
              </div>

              <button
                onClick={openAdd}
                className="rounded-full bg-[#0B1F7F] px-6 py-2 text-sm font-semibold text-white hover:bg-[#11299f]"
              >
                Add subject
              </button>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-inner ring-1 ring-gray-200 max-h-[60vh] overflow-y-auto">
              {subjects.map((s, idx) => (
                <div
                  key={s.code}
                  className="group mb-3 flex items-center justify-between rounded-full bg-blue-100 px-4 py-3 last:mb-0 hover:bg-blue-200"
                  onClick={() => navigate(`/subjects/${s.code}`)}
                >
                  <div className="flex items-center gap-6">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs text-gray-700">
                      {idx + 1}
                    </span>
                    <span className="w-20 truncate text-sm font-bold">{s.code}</span>
                    <span className="truncate text-sm">{s.title}</span>
                  </div>

                  <div className="relative shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button className="rounded-full p-1 hover:bg-blue-300/40">
                      <svg
                        viewBox="0 0 20 20"
                        className="h-5 w-5 fill-[#0B1F7F]"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="4" r="1.5" />
                        <circle cx="10" cy="10" r="1.5" />
                        <circle cx="10" cy="16" r="1.5" />
                      </svg>
                    </button>

                    <div className="absolute right-0 top-8 z-10 hidden min-w-[140px] rounded-md bg-white py-1 text-sm shadow-lg group-hover:block">
                      <button
                        onClick={() => openDelete(s)}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Delete subject
                      </button>
                      <button
                        onClick={() => openUpdate(s)}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Update subject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {showAdd && <AddSubject onClose={() => setShowAdd(false)} onSubmit={handleAdd} />}
      {showUpdate && selected && (
        <UpdateSubject
          onClose={() => setShowUpdate(false)}
          onSubmit={handleUpd}
          initialData={{
            courseCode: code,
            subjectCode: selected.code,
            subjectName: selected.title,
            newLevel: '',
            newCourseName: '',
            files: [],
          }}
        />
      )}
      {showDelete && selected && (
        <DeleteSubject
          isOpen={true}
          onClose={() => setShowDelete(false)}
          onDelete={handleDel}
          initialData={{
            courseCode: code,
            subjectCode: selected.code,
            subjectName: selected.title,
          }}
        />
      )}
    </>
  );
};

export default SubjectOverview;
