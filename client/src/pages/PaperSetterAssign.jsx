import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const PaperSetterAssign = () => {
    const [courses, setCourses] = useState([
        { id: 1, courseId: 'ETC05', name: "Engineering Draughtsmandhip" },
        { id: 2, courseId: 'A01S003F4', name: "Field Assistant(Agriculture)" },
        { id: 3, courseId: '4SA01T03F6', name: "Agriculture Production Technology" },
        { id: 4, courseId: '3D1S1001PS', name: "Food Technology" },
        { id: 5, courseId: 'A01S018F4', name: "Plant Tissue Culture Laboratory Assistant" },
        { id: 6, courseId: '50S001SF3', name: "Automobile Air CC" },
        { id: 7, courseId: 'A01S003F4', name: "Field Assistant" },
        { id: 8, courseId: 'C50S006F3', name: "Motorcycle Mechanic" },

    ]);

    const handleAssign = (courseId) => {
        // Handle the assignment logic here
        console.log(`Assigning course with ID: ${courseId}`);
    };

    const handleCancel = (courseId) => {
        // Handle the cancellation logic here
        console.log(`Cancelling course with ID: ${courseId}`);
    };

    const handleSearch = (e) => {
        comsole.log('Searching for:', e.target.value);
        // Implement search logic here
    };

    return(
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
        <div className="flex justify-between items-center px-6 py-3">
          <div className="flex items-center space-x-4">
            <img src="logo.svg" alt="Department Logo" className="h-10" />
            <div>
              <div className="text-xs text-gray-600">Department of Technical Education & Training</div>
              <div className="text-xs text-gray-600">DTET</div>
            </div>
          </div>
          
          <nav className="flex-1 ml-16">
            <ul className="flex space-x-8">
              <li><Link to="/dashboard" className="text-gray-800">Dashboard</Link></li>
              <li><Link to="/announcements" className="text-blue-600">Announcements</Link></li>
              <li><Link to="/courses" className="text-gray-800">Courses</Link></li>
              <li><Link to="/user-accounts" className="text-gray-800">User Accounts</Link></li>
              <li><Link to="/payments" className="text-gray-800">Payments</Link></li>
            </ul>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="relative">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button>
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-48 bg-white shadow-sm p-4">
          <div className="mb-6">
            <h3 className="text-gray-600 font-medium mb-4">Course</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link to="/courses" className="flex items-center text-gray-700 py-2 px-3 rounded-md">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Course
                  </Link>
                </li>
                <li>
                  <Link to="/exams" className="flex items-center text-white bg-blue-600 py-2 px-3 rounded-md">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Exam
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="mt-auto pt-6">
            <Link to="/dashboard" className="flex items-center text-gray-700 py-2 px-3 rounded-md">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Technical College Final Examination - 2024</h2>
              <button className="bg-indigo-800 text-white px-4 py-2 rounded-md flex items-center">
                Add New
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                  className="w-64 py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:outline-none"
                />
                <div className="absolute left-3 top-2.5">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Exam Course Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-blue-50 rounded-lg overflow-hidden">
                <thead>
                  <tr className="text-left text-gray-600 bg-blue-100">
                    <th className="py-3 px-4 border-b border-blue-200">No.</th>
                    <th className="py-3 px-4 border-b border-blue-200">Course_ID</th>
                    <th className="py-3 px-4 border-b border-blue-200">Course Name</th>
                    <th className="py-3 px-4 border-b border-blue-200" colSpan="2">Actions</th>
                    <th className="py-3 px-4 border-b border-blue-200"></th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b border-blue-100">
                      <td className="py-3 px-4">{course.id}</td>
                      <td className="py-3 px-4">{course.courseId}</td>
                      <td className="py-3 px-4">{course.name}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleAssign(course.id)}
                          className="bg-blue-600 text-white px-4 py-1 rounded"
                        >
                          Assign
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => handleCancel(course.id)}
                          className="bg-gray-100 text-gray-700 px-4 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button>
                          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

     
    </div>
  );
};

export default PaperSetterAssign;


    

