import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function AssignPaperSetters() {
  const { subjectCode } = useParams();

  const [paperSetters, setPaperSetters] = useState([
    { registrationId: 'DTET_PS5431', name: 'Wimalasekera I.S.' },
    { registrationId: 'DTET_PS7721', name: 'Amarathunga A.T.' },
    { registrationId: 'DTET_PS4788', name: 'Jayaprabha P.H.J.' },
    { registrationId: 'DTET_PS229', name: 'Amarasiri K.J.M.' },
    { registrationId: 'DTET_PS5296', name: 'Lokupathirage I.M.' },
    { registrationId: 'DTET_PS2311', name: 'Wijerathna S.M.' },
    { registrationId: 'DTET_PS5111', name: 'Jayathilake P.P.P' },
    { registrationId: 'DTET_PS8957', name: 'Abesekara I.M.' },
  ]);

  useEffect(() => {
    // Track subject visit (POST to backend)
    axios.post(`http://localhost:8080/api/recent-subjects/${subjectCode}`)
      .then(() => console.log('Subject visit logged'))
      .catch((err) => console.error('Failed to track subject visit:', err));
  }, [subjectCode]);

  const assignPaperSetter = (registrationId) => {
    console.log(`Assigned ${registrationId} to ${subjectCode}`);
  };

  const cancelPaperSetter = (registrationId) => {
    console.log(`Canceled ${registrationId} from ${subjectCode}`);
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

  const originalList = [
    { registrationId: 'DTET_PS5431', name: 'Wimalasekera I.S.' },
    { registrationId: 'DTET_PS7721', name: 'Amarathunga A.T.' },
    { registrationId: 'DTET_PS4788', name: 'Jayaprabha P.H.J.' },
    { registrationId: 'DTET_PS229', name: 'Amarasiri K.J.M.' },
    { registrationId: 'DTET_PS5296', name: 'Lokupathirage I.M.' },
    { registrationId: 'DTET_PS2311', name: 'Wijerathna S.M.' },
    { registrationId: 'DTET_PS5111', name: 'Jayathilake P.P.P' },
    { registrationId: 'DTET_PS8957', name: 'Abesekara I.M.' },
  ];

  return (
    <div className="p-8 pt-20 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">{subjectCode} - Technical Drawing</h2>

      <input
        type="text"
        placeholder="Search"
        className="px-4 py-2 border rounded mb-4 w-1/3"
        onChange={handleSearch}
      />

      <table className="w-full text-left border">
        <thead className="bg-blue-200">
          <tr>
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Registration_ID</th>
            <th className="px-4 py-2">Paper setter Name</th>
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
                <button
                  onClick={() => assignPaperSetter(ps.registrationId)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Assign
                </button>
                <button
                  onClick={() => cancelPaperSetter(ps.registrationId)}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
