// src/pages/AnnouncementsUser.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Trash2 } from 'lucide-react'
import NavbarUser from '../components/layout/NavbarUser'  // adjust path if needed

const initialData = [
  { id: 1, author: 'I.M. Lokupathirage', title: 'Upgrade the website',      date: '10 Dec' ,attachments:[]},
  { id: 2, author: 'P.P.P. Jayathilake', title: 'Scheduled System upgrade', date: '6 Oct' ,attachments:[]},
  { id: 3, author: 'W.A.T.E. Wadanambi',  title: 'Power interruption',       date: '2 Aug',attachments:[] },
  { id: 4, author: 'H.M. Kularathne',      title: 'Upgrade the website',      date: '15 May',attachments:[] },
  { id: 5, author: 'I. Wimalasekara',      title: 'Data free access',         date: '19 Feb',attachments:[] },
]

export default function AnnouncementsUser() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [announcements, setAnnouncements] = useState(initialData)

  const deleteAnnouncement = id => {
    setAnnouncements(prev => prev.filter(a => a.id !== id))
  }

  const filtered = announcements.filter(a =>
    a.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <NavbarUser />

      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">


          {/* Search bar */}
          <div className="relative max-w-sm mb-8">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search announcements"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-blue-50 rounded-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Announcements list */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {filtered.map(a => (
              <div
                key={a.id}
                onClick={() => navigate(`/userannouncements/${a.id}`, { state: { announcement: a } })}
                className="flex items-center bg-blue-100 hover:bg-blue-200 rounded-full px-6 py-3 transition-colors cursor-pointer"
              >
                {/* checkbox + author */}
                <div className="flex items-center space-x-4 basis-1/3">
                 
                  <span className="text-gray-800">{a.author}</span>
                </div>

                {/* title */}
                <div className="flex-1 text-center text-gray-800">
                  {a.title}
                </div>

                {/* date + trash */}
                <div className="flex items-center space-x-3 basis-1/3 justify-end">
                  <span className="text-gray-800">{a.date}</span>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      deleteAnnouncement(a.id)
                    }}
                  >
                    <Trash2 size={16} className="text-gray-800 hover:text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
