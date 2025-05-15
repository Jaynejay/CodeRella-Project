import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import NavBarExam from '../../components/layout/NavBarExam';
import SideBarExam from '../../components/layout/SideBarExam';

const mockPaperSetter = {
  id: 1,
  regId: 'DTET_PS5431',
  name: 'Wimalasekera I.S.',
};

function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
         onClick={onClose}>
      {message}
    </div>
  );
}
Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func
};

export default function PaperSetterAssignPage() {
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [applied, setApplied] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type }), 2000);
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (!dueDate) {
      showToast('Please select a due date.', 'error');
      return;
    }
    setApplied(true);
    showToast('Assignment applied successfully!', 'success');
  };

  const handleSendNotification = () => {
    if (!applied) {
      showToast('Please apply the assignment first.', 'error');
      return;
    }
    showToast('Notification sent to paper setter!', 'success');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const openDate = new Date().toLocaleString();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBarExam />
      <div className="flex flex-1">
        <SideBarExam />
        <main className="flex-1 p-8" style={{ marginLeft: '18rem', marginTop: '5.5rem' }}>
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Assign Paper Setter
            </h1>
            <div className="mb-6">
              <div className="text-lg font-semibold text-gray-700 mb-1">{mockPaperSetter.name}</div>
              <div className="text-gray-500">Registration ID: {mockPaperSetter.regId}</div>
            </div>
            <form className="space-y-6" onSubmit={handleApply}>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Open Date</label>
                <input
                  type="text"
                  value={openDate}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Due Date</label>
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  placeholder="Enter any notes..."
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  onClick={handleSendNotification}
                  disabled={!applied}
                >
                  Send Notification
                </button>
              </div>
            </form>
          </div>
          <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: toast.type })} />
        </main>
      </div>
    </div>
  );
} 