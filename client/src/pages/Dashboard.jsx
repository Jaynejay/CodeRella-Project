import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import NavbarCourse from '../components/layout/NavbarCourse'
import Footer       from '../components/layout/Footer'
import Calendar     from '../components/layout/Calendar'
import Deadline     from '../pages/DeadlineAdmin'

import { Clock, Calendar as CalendarIcon, BookOpen } from 'lucide-react'

export default function Dashboard() {
  const managerId = localStorage.getItem('managerId')

  const [recentSubjects,  setRecentSubjects]  = useState([])
  const [events,          setEvents]          = useState([])
  const [announcements,   setAnnouncements]   = useState([])
  const [psNotifications, setPSNotifications] = useState([])
  const [selectedEvent,   setSelectedEvent]   = useState(null)
  const [showDeadline,    setShowDeadline]    = useState(false)

  useEffect(() => {
    const base = 'http://localhost:8080/api'

    axios.get(`${base}/recent-subjects`)
      .then(res => setRecentSubjects(res.data))
      .catch(console.error)

    axios.get(`${base}/events?managerId=${managerId}`)
      .then(res => {
        setEvents(res.data.map(e => ({
          date:    e.eventDate || e.date,
          label:   e.label,
          subject: e.subject
        })))
      })
      .catch(console.error)

    axios.get(`${base}/announcements`)
      .then(res => setAnnouncements(res.data))
      .catch(console.error)

    axios.get(`${base}/papersetter/announcements?paperSetterId=${managerId}`)
      .then(res => setPSNotifications(res.data))
      .catch(console.error)
  }, [managerId])

  const handleEventClick = e => {
    setSelectedEvent(e)
    setShowDeadline(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavbarCourse />

      <main className="flex-1 bg-gray-50 pt-32 pb-8">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="rounded-lg bg-white p-6 shadow">

            {/* ✅ Recently accessed subjects */}
            <h2 className="mb-4 text-lg font-semibold">Recently accessed subjects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {recentSubjects.map(s => (
                <Link
                  key={s.code}
                  to={`/subjects/${s.code}`}
                  className="block overflow-hidden rounded-lg shadow hover:shadow-md border"
                >
                  <div className="relative aspect-video">
                    {s.coverPath ? (
                      <img
                        src={`http://localhost:8080/uploads/subject_covers/${s.coverPath}`}
                        alt={s.title}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                    <span className="absolute top-2 left-2 bg-blue-800 text-white text-xs px-2 py-0.5 rounded">
                      {s.level}
                    </span>
                  </div>
                  <div className="p-3 text-center text-sm font-medium">
                    {s.code} – {s.title}
                  </div>
                </Link>
              ))}
            </div>

            {/* Calendar */}
            <div className="mb-8">
              <Calendar events={events} onEventClick={handleEventClick} />
            </div>

            {/* Manager’s announcements */}
            <section className="mb-8">
              <h2 className="mb-2 text-lg font-semibold">Your announcements</h2>
              <ul className="divide-y text-sm">
                {announcements.map(a => (
                  <li key={a.id} className="py-2">
                    <strong>{a.title}</strong>: {a.message}
                  </li>
                ))}
              </ul>
              <Link to="/announcements" className="mt-2 inline-block text-blue-600">
                Older Announcements…
              </Link>
            </section>

            {/* Notifications you’ve received */}
            <section>
              <h2 className="mb-2 text-lg font-semibold">Notifications</h2>
              <ul className="divide-y text-sm">
                {psNotifications.map(n => (
                  <li key={n.id} className="py-2">
                    <strong>{n.subject}</strong>: {n.message}
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </div>
      </main>

      <Footer />

      {/* Deadline modal popup */}
      {showDeadline && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Deadline
            headerText={`${selectedEvent.label} is due`}
            onClose={() => setShowDeadline(false)}
            details={[
              { icon: Clock, text: selectedEvent.date },
              { icon: CalendarIcon, text: selectedEvent.label },
              { icon: BookOpen, text: selectedEvent.subject },
            ]}
            buttonText="Activity"
            width={480}
            height={400}
          />
        </div>
      )}
    </div>
  )
}
