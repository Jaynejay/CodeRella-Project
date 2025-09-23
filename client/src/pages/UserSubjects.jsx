// src/pages/UserSubjects.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavbarUser from '../components/layout/NavbarUser';
import Footer from '../components/layout/Footer';

export default function UserSubjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const registrationId = localStorage.getItem('registrationId') || 'DTET_PS5431';
      if (!registrationId) {
        console.error('Missing registrationId');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/api/subjects/assigned-to/${registrationId}`);
        const mapped = res.data.map((s) => ({
          id: s.code,
          title: s.title,
          level: s.level,
          coverPath: s.coverPath
        }));
        setSubjects(mapped);
      } catch (err) {
        console.error('Error fetching subjects:', err);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-20">
      <NavbarUser />

      <main className="container mx-auto px-4 py-10 flex-grow">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">My Subjects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {subjects.map((sub) => (
              <Link
                key={sub.id}
                to={`/subject/${sub.id}/add-submission`}
                className="block relative bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="w-full h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={`http://localhost:8080/uploads/subject_covers/${sub.coverPath}`}
                    alt={sub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="absolute top-3 right-3 bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {sub.level}
                </span>
                <div className="p-4">
                  <p className="text-sm text-gray-800 truncate">
                    {`${sub.id} - ${sub.title}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
