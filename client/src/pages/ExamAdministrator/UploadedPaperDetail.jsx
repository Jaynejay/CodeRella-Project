import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NavBarExam from '../../components/layout/NavBarExam';
import SideBarExam from '../../components/layout/SideBarExam';

export default function UploadedPaperDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(state?.paper?.verified || false);
  const [toast, setToast] = useState('');

  if (!state?.paper) {
    return <div className="p-8">No paper data found.</div>;
  }

  const handleVerify = () => {
    setVerified(true);
    setToast('Paper verified successfully!');
    setTimeout(() => {
      setToast('');
      navigate('/uploaded-papers', { state: { id: state.paper.id, verified: true } });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBarExam />
      <div className="flex flex-1">
        <SideBarExam />
        <main className="flex-1 flex items-center justify-center p-8" style={{ marginLeft: '18rem', marginTop: '5.5rem' }}>
          <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl w-full border border-blue-100">
            <h1 className="text-2xl font-bold text-blue-800 mb-8 text-center">Uploaded Exam Paper</h1>
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-gray-700 w-48">Paper Setter Name:</span>
                <span className="bg-gray-50 rounded px-3 py-1 shadow-inner text-gray-900 flex-1">{state.paper.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-gray-700 w-48">Subject Code:</span>
                <span className="bg-gray-50 rounded px-3 py-1 shadow-inner text-gray-900 flex-1">SUB_01</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-gray-700 w-48">Subject Name:</span>
                <span className="bg-gray-50 rounded px-3 py-1 shadow-inner text-gray-900 flex-1">Technical Drawing</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-gray-700 w-48">Exam Paper:</span>
                <span className="flex-1 flex items-center justify-center">
                  <img src="/pdf-icon.png" alt="PDF" className="w-24 h-24 mx-auto" />
                </span>
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-6">
              <button
                className={`px-8 py-2 rounded font-semibold shadow transition-colors duration-150 ${verified ? 'bg-green-500 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                onClick={handleVerify}
                disabled={verified}
              >
                {verified ? 'Verified' : 'Verify'}
              </button>
              <button
                className="px-8 py-2 rounded font-semibold border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 shadow transition-colors duration-150"
                onClick={() => navigate('/uploaded-papers')}
              >
                Cancel
              </button>
            </div>
            {toast && (
              <div className="mt-8 text-green-600 text-center font-semibold animate-pulse">{toast}</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 