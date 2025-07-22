// src/pages/CourseOverview.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseSidebar from '../components/layout/CourseSidebar';
import AddingCourse  from './AddingCourse';
import UpdateCourse  from './UpdateCourse';
import DeleteCourse  from './DeleteCourse';

import addPlus from '../assets/images/Addcourseplus.svg';
import Agricul from '../assets/images/Agriculturalproduction.svg';
import Field  from '../assets/images/FieldAssist.svg';
import Food from '../assets/images/FoodTechnology.svg';
import Motor from '../assets/images/Motorcycle.svg';
import Planttissue from '../assets/images/Planttissuelab.svg';

export const initialCourses = [
  {
    id: 1,
    code: 'A01S003F4.3',
    level: 'NVQ 4',
    title: 'Field Assistant (Agriculture)',
    img:Field ,
  },
  {
    id: 2,
    code: '45AQ1T003F6.1',
    level: 'NVQ 6',
    title: 'Higher National Diploma in Agricultural Production Technology',
    img: Agricul,
  },
  {
    id: 3,
    code: 'G50S006F3.3',
    level: 'NVQ 3',
    title: 'Motircycle Mechanic',
    img: Motor,
  },
  {
    id: 4,
    code: '3D15T001P5-1',
    level: 'NVQ 5',
    title: 'National Diploma in Food Technology',
    img: Food,
  },
  {
    id: 5,
    code: 'A01S018F4.0',
    level: 'NVQ 4',
    title: 'Plant Tissue Culture Laboratory Assistant',
    img: Planttissue,
  },


];

export default function CourseOverview() {
  const navigate = useNavigate();

  /** ---------- local state ---------- */
  const [courses, setCourses]         = useState(initialCourses);
  const [showAdd, setShowAdd]         = useState(false);
  const [menuOpen, setMenuOpen]       = useState(null);   // course-id that owns an open menu
  const [editCourse, setEditCourse]   = useState(null);   // object → UpdateCourse modal
  const [removeCourse, setRemoveCourse] = useState(null); // object → DeleteCourse modal

  /** ---------- handlers ---------- */
  const handleAddSubmit = (data) => {
    const newCourse = {
      id: Date.now(),
      code : data.courseCode  || `CODE${courses.length + 1}`,
      level: data.courseLevel || 'NVQ 4',
      title: data.courseName  || 'Untitled Course',
      img  : URL.createObjectURL(data.courseImage),
    };
    setCourses(prev => [...prev, newCourse]);
    setShowAdd(false);
  };

  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setRemoveCourse(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* sidebar */}
      <CourseSidebar />

      {/* ---------- main column ---------- */}
      <main className="flex-1 overflow-y-auto bg-gray-100">
        {/* centred panel */}
        <div className="mx-auto mt-24 w-[90%] max-w-6xl rounded-xl bg-white p-6 pb-12 shadow  max-h-[calc(100vh-8rem)] overflow-y-auto">
          {/* search row (still visual only) */}
          <div className="mb-6 flex items-center justify-between">
            <div className="relative w-60">
              <input
                type="text"
                placeholder="Search Course"
                className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 text-sm
                           focus:border-blue-500 focus:outline-none"
              />
              <span className="material-icons-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
            </div>
          </div>

          {/* ---------- card grid ---------- */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* add-course tile */}
            <button
              onClick={() => setShowAdd(true)}
              className="flex h-60 w-full flex-col items-center justify-center rounded-lg border-2
                         border-dashed border-gray-300 text-gray-600 hover:border-blue-500 hover:bg-blue-50  bg-blue-100"
            >
              <img src={addPlus} alt="Add course" className="mb-3 h-16 w-16 select-none pointer-events-none" />
              <span className="text-lg font-medium">Add Course</span>
            </button>

            {courses.map((c) => (
              <div
                key={c.id}
                className="group relative h-60 cursor-pointer overflow-hidden rounded-lg bg-white shadow
                           hover:shadow-md"
                onClick={() => navigate(`/courses/${c.code}`)}
              >
                <img src={c.img} alt={c.title} className="h-32 w-full object-cover" />

                <div className="p-3">
                  <span className="mb-1 inline-block rounded-full bg-indigo-700 px-2 py-0.5 text-xs font-semibold text-white">
                    {c.level}
                  </span>
                  <h3 className="line-clamp-2 text-sm font-medium">{c.title}</h3>
                  <p className="text-xs text-gray-500">{c.code}</p>
                </div>

                {/* three-dot menu */}
                <div
                  className="absolute right-1.5 top-1.5 rounded-full   bg-white p-1
+             ring-1 ring-gray-300 hover:bg-blue-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(menuOpen === c.id ? null : c.id);
                  }}
                >
                  <span className="material-icons-outlined text-gray-500">more_vert</span>
                </div>

                {/* dropdown */}
                {menuOpen === c.id && (
                  <div
                    className="absolute right-2 top-9 z-20 w-32 rounded-md border border-gray-100 bg-white
                               py-1 text-sm shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="flex w-full items-center px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setEditCourse(c);
                        setMenuOpen(null);
                      }}
                    >
                      Update course
                    </button>
                    <button
                      className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        setRemoveCourse(c);
                        setMenuOpen(null);
                      }}
                    >
                      Delete course
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ---------- modals ---------- */}
      {showAdd && (
        <AddingCourse
          isOpen
          onClose={() => setShowAdd(false)}
          onSubmit={handleAddSubmit}
        />
      )}

      {editCourse && (
        <UpdateCourse
          course={editCourse}
          isOpen
          onClose={() => setEditCourse(null)}
          // onSubmit={…}   ← plug in when you wire the backend
        />
      )}

      {removeCourse && (
        <DeleteCourse
          course={removeCourse}
          isOpen
          onClose={() => setRemoveCourse(null)}
          onConfirm={() => handleDelete(removeCourse.id)}
        />
      )}
    </div>
  );
}
