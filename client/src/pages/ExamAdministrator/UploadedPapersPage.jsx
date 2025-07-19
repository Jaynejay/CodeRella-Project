//for uploaded papers page

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBarExam from '../../components/layout/NavBarExam';
import SideBarExam from '../../components/layout/SideBarExam';
import { MoreVertical } from 'lucide-react';

const mockPapers = [
  { id: 1, regId: 'DTET_PS5431', name: 'Wimalasekera I.S.', verified: false },
  { id: 2, regId: 'DTET_PS7721', name: 'Amarathunga A.T.', verified: false },
  { id: 3, regId: 'DTET_PS4788', name: 'Jayaprabha P.H.J.', verified: false },
  { id: 4, regId: 'DTET_PS229', name: 'Amarasiri K.J.M.', verified: false },
];

export default function UploadedPapersPage() {
  // State management
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(null); // paper id for open menu
  const [papers, setPapers] = useState(mockPapers);
  const navigate = useNavigate();
  const location = useLocation();

  // Updates paper status when returning from detail page
  useEffect(() => {
    if (location.state?.id && location.state?.verified) {
      setPapers(prev =>
        prev.map(p =>
          p.id === location.state.id ? { ...p, verified: true } : p
        )
      );
    }
  }, [location.state]);

  // Filters papers based on search query
  const filteredPapers = papers.filter(ps =>
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
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Uploaded Exam Paper</h1>
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
                  {filteredPapers.map((ps, idx) => (
                    <tr key={ps.id} className="border-b last:border-b-0">
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3 font-mono">{ps.regId}</td>
                      <td className="p-3">{ps.name}</td>
                      <td className="p-3 flex items-center gap-2 relative">
                        <button
                          className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-700"
                          onClick={() => navigate('/uploaded-paper-detail', { state: { paper: ps } })}
                        >
                          View
                        </button>
                        <button
                          className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${ps.verified ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-yellow-100 text-yellow-700 border border-yellow-400'}`}
                          disabled
                        >
                          {ps.verified ? 'Verified' : 'Not Verified'}
                        </button>
                        <button
                          className="ml-2 p-1 rounded-full hover:bg-gray-200"
                          onClick={() => setMenuOpen(menuOpen === ps.id ? null : ps.id)}
                        >
                          <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>
                        {menuOpen === ps.id && (
                          <div className="absolute right-0 top-8 bg-white border rounded shadow-lg z-10 w-32 py-1">
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50"
                              onClick={() => setMenuOpen(null)}
                            >
                              Edit
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              onClick={() => setMenuOpen(null)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredPapers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-8 text-gray-500">No uploaded papers found.</td>
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