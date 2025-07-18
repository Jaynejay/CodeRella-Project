import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBarExam from '../../components/layout/NavBarExam';
import SideBarExam from '../../components/layout/SideBarExam';
import { MoreVertical } from 'lucide-react';

const mockPaperSetters = [
  { id: 1, name: 'Wimalasekera I.S.', email: 'wimalasekera@example.com', phone: '+94-71-123-4567' },
  { id: 2, name: 'Amarathunga A.T.', email: 'amarathunga@example.com', phone: '+94-71-234-5678' },
  { id: 3, name: 'Jayaprabha P.H.J.', email: 'jayaprabha@example.com', phone: '+94-71-345-6789' },
  { id: 4, name: 'Fernando D.S.', email: 'fernando@example.com', phone: '+94-71-456-7890' },
  { id: 5, name: 'Perera K.M.', email: 'perera@example.com', phone: '+94-71-567-8901' },
];

export default function PaperSetterListPage() {
  const [paperSetters] = useState(mockPaperSetters);
  const [menuOpen, setMenuOpen] = useState(null); // paperSetter id for open menu
  const navigate = useNavigate();

  const handleAssign = (paperSetterId) => {
    navigate(`/exam-management/1/course/1/papersetter/${paperSetterId}/assign`);
  };

  const handleEdit = (id) => {
    setMenuOpen(null);
    alert(`Edit Paper Setter ${id} (demo)`);
  };

  const handleDelete = (id) => {
    setMenuOpen(null);
    alert(`Delete Paper Setter ${id} (demo)`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBarExam />
      <div className="flex flex-1">
        <SideBarExam />
        <main className="flex-1 p-8" style={{ marginLeft: '18rem', marginTop: '5.5rem' }}>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Paper Setters</h1>
            <div className="overflow-x-auto">
              <table className="w-full bg-blue-100 rounded-xl">
                <thead>
                  <tr className="text-left text-gray-700 font-semibold">
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paperSetters.map((ps) => (
                    <tr key={ps.id} className="border-b last:border-b-0">
                      <td className="p-3">{ps.id}</td>
                      <td className="p-3">{ps.name}</td>
                      <td className="p-3">{ps.email}</td>
                      <td className="p-3">{ps.phone}</td>
                      <td className="p-3 flex items-center gap-2 relative">
                        <button
                          className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-700"
                          onClick={() => handleAssign(ps.id)}
                        >
                          Assign
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
                              onClick={() => handleEdit(ps.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              onClick={() => handleDelete(ps.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
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
} 