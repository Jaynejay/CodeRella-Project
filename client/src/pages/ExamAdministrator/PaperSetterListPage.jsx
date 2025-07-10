import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { paperSetterAPI, subjectAPI } from '../../services/api';
import NavBarExam from '../../components/layout/NavBarExam';
import SideBarExam from '../../components/layout/SideBarExam';

export default function PaperSetterListPage() {
  const { examId, courseId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [paperSetters, setPaperSetters] = useState([]);
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch paper setters
        const paperSettersResponse = await paperSetterAPI.getAll();
        setPaperSetters(paperSettersResponse.data);
        
        // Fetch subject details if courseId is provided
        if (courseId) {
          try {
            const subjectResponse = await subjectAPI.getByCourseId(courseId);
            if (subjectResponse.data && subjectResponse.data.length > 0) {
              setSubject(subjectResponse.data[0]); // Assuming we want the first subject
            }
          } catch (subjectError) {
            console.warn('Could not fetch subject details:', subjectError);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load paper setters. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const filteredPaperSetters = paperSetters.filter(ps =>
    ps.name.toLowerCase().includes(search.toLowerCase()) ||
    ps.registrationId.toLowerCase().includes(search.toLowerCase())
  );

  const handleAssign = (paperSetterId) => {
    navigate(`/exam-management/${examId}/course/${courseId}/papersetter/${paperSetterId}/assign`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <NavBarExam />
        <div className="flex flex-1">
          <SideBarExam />
          <main className="flex-1 p-8" style={{ marginLeft: '18rem', marginTop: '5.5rem' }}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <NavBarExam />
        <div className="flex flex-1">
          <SideBarExam />
          <main className="flex-1 p-8" style={{ marginLeft: '18rem', marginTop: '5.5rem' }}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center text-red-600">
                <p className="text-lg font-semibold">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Retry
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBarExam />
      <div className="flex flex-1">
        <SideBarExam />
        <main className="flex-1 p-8" style={{ marginLeft: '18rem', marginTop: '5.5rem' }}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              {subject ? `${subject.code} - ${subject.name}` : 'Paper Setters'}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-72">
                <input
                  type="text"
                  placeholder="Search paper setters..."
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
                    <th className="p-3">Registration_ID</th>
                    <th className="p-3">Paper setter Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPaperSetters.map((ps, idx) => (
                    <tr key={ps.id} className="border-b last:border-b-0">
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3 font-mono">{ps.registrationId}</td>
                      <td className="p-3">{ps.name}</td>
                      <td className="p-3">{ps.email || '-'}</td>
                      <td className="p-3">{ps.phone || '-'}</td>
                      <td className="p-3 flex items-center gap-2">
                        <button
                          className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-700"
                          onClick={() => handleAssign(ps.id)}
                        >
                          Assign
                        </button>
                        <button
                          className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-300"
                          disabled
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredPaperSetters.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-500">
                        {search ? 'No paper setters found matching your search.' : 'No paper setters available.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 