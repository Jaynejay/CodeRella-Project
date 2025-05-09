import { useState } from 'react'
import { Link } from 'react-router-dom'
import NavbarCourse from '../components/layout/NavbarCourse'
import Footer from '../components/layout/Footer'
import Calendar from '../components/layout/Calendar'
import Deadline from './DeadlineAdmin'
import { Clock, Calendar as CalendarIcon, BookOpen } from 'lucide-react'
import Agricul from '../assets/images/Agriculturalproduction.svg'
import Field from '../assets/images/FieldAssist.svg'
import Food from '../assets/images/FoodTechnology.svg'
import Planttissue from '../assets/images/Planttissuelab.svg'

/* ─ recentCourses (4 items) ─ */
const recentCourses = [
  { id: 'sub-01', title: 'Principles Of Plant Protection', level: 'NVQ 6', cover: Agricul },
  { id: 'sub-02', title: 'Other Field Crop Production', level: 'NVQ 6', cover: Field },
  { id: 'sub-03', title: 'Plantation & Export Agricultural Crop Production', level: 'NVQ 6', cover: Planttissue },
  { id: 'sub-04', title: 'Intro to Organic Farming', level: 'NVQ 5', cover: Food },
]

/* ─ latestAnnouncements (unchanged) ─ */
const announcements = [
  { id: 1, date: '10 December, 11:48', author: 'Admin user', body: 'Upgrade website' },
  { id: 2, date: '7 January, 22:34', author: 'Admin user', body: 'Welcome to website' },
]

export default function Dashboard() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showDeadline, setShowDeadline] = useState(false)

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setShowDeadline(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavbarCourse />

      <main className="flex-1 bg-gray-50 pt-32 pb-8">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="rounded-lg border bg-white p-6 shadow">

            {/* ─ Recently accessed subjects ─ */}
            <h2 className="mb-4 text-lg font-semibold">Recently accessed subjects</h2>

            <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-4 mb-8">
              {recentCourses.map((c) => (
                <Link
                  to={`/adminsubject-detail/${c.id}`}
                  key={c.id}
                  className="overflow-hidden rounded-lg border hover:shadow w-full"
                >
                  <div className="relative aspect-square w-full">
                    <img
                      src={c.cover}
                      alt={c.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute top-1 left-1 rounded bg-blue-800 px-2 py-0.5 text-xs font-semibold text-white">
                      {c.level}
                    </span>
                  </div>
                  <div className="p-3 text-base text-center truncate">
                    {c.id} – {c.title}
                  </div>
                </Link>
              ))}
            </div>

            {/* Calendar with assignments details */}
            <div className="mb-8">
              <Calendar
                events={[
                  { date: '2025-05-31', label: 'Exam paper', subject: 'SUB-01-Principles Of Plant Protection' },
                  { date: '2025-05-23', label: 'Exam paper', subject: 'SUB-02-Other Field Crop Production' },
                ]}
                onEventClick={handleEventClick}
              />
            </div>

            {/* ─ Latest announcements ─ */}
            <section>
              <h2 className="mb-2 text-lg font-semibold">Latest announcements</h2>
              <ul className="divide-y text-sm">
                {announcements.map((a) => (
                  <li key={a.id}>
                    <Link
                      to={`/announcements/${a.id}`}
                      state={{ announcement: a }}
                      className="block py-2 hover:bg-gray-100"
                    >
                      <p className="text-gray-600">{a.date}</p>
                      <p className="font-medium">{a.author}</p>
                      <p>{a.body}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/announcements" className="mt-2 inline-block text-blue-600">
                Older Announcements…
              </Link>
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
