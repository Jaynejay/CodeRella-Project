import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import CourseSidebar from "../components/layout/CourseSidebar";
import NavbarCourse from '../components/layout/NavbarCourse';

export default function SubjectDetail() {
  const { subjectCode } = useParams();

  const [paperSetters, setPaperSetters] = useState([]);
  const [assignedSetters, setAssignedSetters] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [subjectTitle, setSubjectTitle] = useState('');

  useEffect(() => {
    // Track subject visit
    axios.post(`http://localhost:8080/api/recent-subjects/${subjectCode}`)
      .catch(err => console.error('Failed to track subject visit:', err));

    // Load subject title
    // axios.get(`http://localhost:8080/api/subjects/${subjectCode}`)
    //   .then(res => setSubjectTitle(res.data.title))
    //   .catch(err => console.error('Failed to fetch subject title:', err));

    // Load all paper setters
    axios.get('http://localhost:8080/api/paper-setters')
      .then(res => {
        setPaperSetters(res.data);
        setOriginalList(res.data);
      })
      .catch(err => console.error('Failed to fetch paper setters', err));

    // Load assigned paper setters
    axios.get(`http://localhost:8080/api/subject-assignments/${subjectCode}`)
      .then(res => setAssignedSetters(res.data))
      .catch(err => console.error('Failed to fetch assigned setters', err));
  }, [subjectCode]);

  const assignPaperSetter = (registrationId) => {
    axios.post('http://localhost:8080/api/subject-assignments/assign', {
      subjectCode,
      registrationId
    }).then(() => {
      setAssignedSetters(prev => [...prev, registrationId]);
    }).catch(err => console.error('Assign failed', err));
  };

  const cancelPaperSetter = (registrationId) => {
    axios.post('http://localhost:8080/api/subject-assignments/cancel', {
      subjectCode,
      registrationId
    }).then(() => {
      setAssignedSetters(prev => prev.filter(id => id !== registrationId));
    }).catch(err => console.error('Cancel failed', err));
  };

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    const filtered = originalList.filter(
      (ps) =>
        ps.name.toLowerCase().includes(search) ||
        ps.registrationId.toLowerCase().includes(search)
    );
    setPaperSetters(filtered);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <CourseSidebar />

      {/* Main Content */}
      <div className="flex-1">
        <NavbarCourse />

        <div className="p-8 mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            Subject: {subjectCode}
          </h2>

          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 border rounded mb-4 w-1/3"
            onChange={handleSearch}
          />

          <table className="w-full text-left border">
            <thead className="bg-blue-200 sticky top-0">
              <tr>
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Registration ID</th>
                <th className="px-4 py-2">Paper Setter Name</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paperSetters.map((ps, index) => (
                <tr key={ps.registrationId} className="bg-blue-100">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{ps.registrationId}</td>
                  <td className="px-4 py-2">{ps.name}</td>
                  <td className="px-4 py-2 space-x-2">
                    {assignedSetters.includes(ps.registrationId) ? (
                      <button
                        onClick={() => cancelPaperSetter(ps.registrationId)}
                        className="bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => assignPaperSetter(ps.registrationId)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Assign
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
