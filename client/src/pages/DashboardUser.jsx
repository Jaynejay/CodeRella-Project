// src/pages/DashboardUser.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { parseISO, format } from "date-fns";
import { Clock, Calendar as CalendarIcon } from "lucide-react";

import NavbarUser from "../components/layout/NavbarUser";
import Footer from "../components/layout/Footer";
import Calendar from "../components/layout/Calendar";
import DeadlineUser from "./DeadlineUser";

export default function DashboardUser() {
  const [recentCourses, setRecentCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeadline, setShowDeadline] = useState(false);

  const registrationId = "224008K";  // Replace dynamically if needed
  const paperSetterId = 1;           // Replace dynamically if needed

  useEffect(() => {
    axios.get(`http://localhost:8080/api/subjects/papersetter/${registrationId}`)
      .then(res => {
        const mapped = res.data.map((s) => ({
          id: s.id,
          title: s.title,
          level: s.level,
          cover: `http://localhost:8080/${s.imageUrl}`  // dynamic image
        }));
        setRecentCourses(mapped);
      })
      .catch(err => console.error("Subjects fetch failed:", err));

    axios.get("http://localhost:8080/api/papersetter/announcements", {
      params: { paperSetterId }
    })
      .then(res => {
        const mapped = res.data.map(a => ({
          id: a.id,
          author: a.author,
          date: new Date(a.sentAt).toLocaleString("en-GB", {
            day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
          }),
          body: a.subject,
          message: a.message
        }));
        setAnnouncements(mapped);
      })
      .catch(err => console.error("Announcements fetch failed:", err));

    axios.get("http://localhost:8080/api/calendar/activities", {
      params: { paperSetterId }
    })
      .then(res => {
        const mapped = res.data.map(a => ({
          date: a.date,
          label: a.title,
          status: a.status
        }));
        setCalendarEvents(mapped);
      })
      .catch(err => console.error("Calendar fetch failed:", err));
  }, []);

  const handleEventClick = (evt) => {
    setSelectedEvent(evt);
    setShowDeadline(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <NavbarUser />
      <main className="flex-1 bg-gray-50 pt-32 pb-8">
        <div className="mx-auto w-full max-w-7xl px-4">
          <div className="rounded-lg border bg-white p-6 shadow">

            <h2 className="mb-4 text-lg font-semibold">Recently accessed subjects</h2>
            <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-4 mb-8">
              {recentCourses.map(c => (
                <Link to={c.id} key={c.id} className="overflow-hidden rounded-lg border hover:shadow w-full">
                  <div className="relative aspect-square w-full">
                    <img src={c.cover} alt={c.title} className="absolute inset-0 h-full w-full object-cover" />
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

            <div className="mb-8">
              <Calendar events={calendarEvents} onEventClick={handleEventClick} />
            </div>

            <section>
              <h2 className="mb-2 text-lg font-semibold">Latest announcements</h2>
              <ul className="divide-y text-sm">
                {announcements.map((a) => (
                  <li key={a.id}>
                    <Link to={`/userannouncements/${a.id}`} state={{ announcement: a }} className="block py-2 hover:bg-gray-100">
                      <p className="text-gray-600">{a.date}</p>
                      <p className="font-medium">{a.author}</p>
                      <p>{a.body}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/userannouncements" className="mt-2 inline-block text-blue-600">
                Older Announcements…
              </Link>
            </section>
          </div>
        </div>
      </main>
      <Footer />

      {showDeadline && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <DeadlineUser
            headerText={selectedEvent.label}
            onClose={() => setShowDeadline(false)}
            details={[
              { icon: Clock, text: format(parseISO(selectedEvent.date), "EEEE, MMMM d, yyyy • 6:00 pm") },
              { icon: CalendarIcon, text: `Status: ${selectedEvent.status}` },
            ]}
            buttonText="Activity"
            width="480px"
            height="400px"
          />
        </div>
      )}
    </div>
  );
}
