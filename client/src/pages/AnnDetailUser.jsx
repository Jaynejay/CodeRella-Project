// src/pages/AnnDetailUser.jsx
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import NavbarUser from '../components/layout/NavbarUser'
import { ArrowLeft, Paperclip } from 'lucide-react'

export default function AnnDetailUser() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { id } = useParams()

  // 1) Define your defaults
  const defaultAttachments = [{ name: 'document.pdf', url: '#' }]
  const defaultAnnouncement = {
    author: 'Author Name',
    recipient: 'Recipient Name',
    title: `Announcement #${id}`,
    date: '1 Jan',
    message: 'Full announcement content goes here.',
    attachments: defaultAttachments
  }

  // 2) Merge in any state, but then explicitly set attachments just once
  const fromState = state?.announcement ?? {}
  const announcement = {
    ...defaultAnnouncement,
    ...fromState,
    attachments: fromState.attachments ?? defaultAttachments
  }

  const isSent = announcement.author === 'You'
  const label  = isSent ? 'To' : 'By'
  const name   = isSent ? announcement.recipient : announcement.author

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <NavbarUser />

      <main className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="mr-2" size={20} /> Back
        </button>

        <h1 className="text-lg font-medium mb-6">{announcement.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          {label}: {name} on {announcement.date}
        </div>

        <div className="prose prose-gray mb-6 whitespace-pre-line">
          {announcement.message}
        </div>

        {announcement.attachments.length > 0 && (
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
  )
}
