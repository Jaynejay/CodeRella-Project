// src/pages/AnnouncementDetail.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarCourse from '../components/layout/NavbarCourse';
import { ArrowLeft, Paperclip } from 'lucide-react';

export default function AnnouncementDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const announcement = state?.announcement;

  // 🔐 If no data was passed (e.g., refresh), show fallback message
  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-100 pt-40">
        <NavbarCourse />
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6 text-center text-gray-600">
          No announcement details available.
        </div>
      </div>
    );
  }

  const isSent = announcement.author === 'admin001'; // TODO: Replace with dynamic check
  const label = isSent ? 'To' : 'By';
  const name = isSent ? announcement.recipientUsername : announcement.author;
  const displayDate = new Date(announcement.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-100 pt-40">
      <NavbarCourse />

      <main className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="mr-2" size={20} /> Back
        </button>

        <h1 className="text-lg font-medium mb-6">{announcement.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          {label}: {name} on {displayDate}
        </div>

        <div className="prose prose-gray mb-6 whitespace-pre-line">
          {announcement.message}
        </div>

        {announcement.attachments?.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2">Attachments</h2>
            <ul className="list-disc list-inside">
              {announcement.attachments.map((file, idx) => (
                <li key={idx} className="flex items-center">
                  <Paperclip className="mr-2 text-gray-600" size={16} />
                  <a href={file.url} className="text-blue-600 hover:underline">
                    {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
