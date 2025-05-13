// src/pages/AdminSubjectDetail.jsx

import { useParams, Link } from 'react-router-dom'

export default function AdminSubjectDetail() {
  const { id } = useParams()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">
        Subject {id} — Coming Soon!
      </h1>
      <p className="mb-6 text-gray-600">
        The detailed view for this subject is not yet available.
      </p>
      <Link
        to="/dashboard"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
