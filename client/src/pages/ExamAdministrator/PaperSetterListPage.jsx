import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NavBarExam from '../../components/layout/NavBarExam';
import SideBarExam from '../../components/layout/SideBarExam';

const mockSubject = {
  code: 'SUB_01',
  name: 'Technical Drawing',
};

const mockPaperSetters = [
  { id: 1, regId: 'DTET_PS5431', name: 'Wimalasekera I.S.' },
  { id: 2, regId: 'DTET_PS7721', name: 'Amarathunga A.T.' },
  { id: 3, regId: 'DTET_PS4788', name: 'Jayaprabha P.H.J.' },
  { id: 4, regId: 'DTET_PS229', name: 'Amarasiri K.J.M.' },
  { id: 5, regId: 'DTET_PS5296', name: 'Lokupathirage I.M.' },
  { id: 6, regId: 'DTET_PS2311', name: 'Wijerathna S.M.' },
  { id: 7, regId: 'DTET_PS5111', name: 'Jayathilake P.P.P.' },
  { id: 8, regId: 'DTET_PS8957', name: 'Abesekara I.M.' },
];

export default function PaperSetterListPage() {
  const { examId, courseId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredPaperSetters = mockPaperSetters.filter(ps =>
    ps.name.toLowerCase().includes(search.toLowerCase()) ||
    ps.regId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBarExam />
      <div className="flex flex-1">
        <SideBarExam />
        <main className="flex-1 p-8" style={{ marginLeft: '18rem', marginTop: '5.5rem' }}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              {mockSubject.code} - {mockSubject.name}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-72">
                <input
                  type="text"
                  placeholder="Search"
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
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPaperSetters.map((ps, idx) => (
                    <tr key={ps.id} className="border-b last:border-b-0">
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3 font-mono">{ps.regId}</td>
                      <td className="p-3">{ps.name}</td>
                      <td className="p-3 flex items-center gap-2">
                        <button
                          className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-700"
                          onClick={() => navigate(`/exam-management/${examId}/course/${courseId}/papersetter/${ps.id}/assign`)}
                        >
                          Assign
                        </button>
                        <button
                          className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-300"
                          disabled
                        >
                          Cancel
                        </button>
                        {/* Add three-dots menu here if needed */}
                      </td>
                    </tr>
                  ))}
                  {filteredPaperSetters.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-gray-500">No paper setters found.</td>
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