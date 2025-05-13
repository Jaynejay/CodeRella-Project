// src/components/layout/Calendar.jsx
import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  format
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

/** Build weeks-of-days grid for a given month */
function buildMonthGrid(monthStart) {
  const today     = new Date();
  const monthEnd  = endOfMonth(monthStart);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const weeks     = [];
  let cursor      = gridStart;

  while (cursor <= monthEnd) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push({
        date:      cursor,
        isCurrent: isSameMonth(cursor, monthStart),
        isToday:   isSameDay(cursor, today),
      });
      cursor = addDays(cursor, 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export default function Calendar({ events, onEventClick }) {
  const [viewDate, setViewDate] = useState(new Date());

  const prevMonth = () => setViewDate(subMonths(viewDate, 1));
  const nextMonth = () => setViewDate(addMonths(viewDate, 1));

  const monthStart = startOfMonth(viewDate);
  const weeks      = useMemo(() => buildMonthGrid(monthStart), [monthStart]);

  // Index events by ISO date string
  const eventsByDate = useMemo(() => {
    const m = {};
    events.forEach((e) => {
      m[e.date] = e;
    });
    return m;
  }, [events]);

  return (
    <div className="rounded-lg border border-blue-300 bg-white shadow p-4">
      {/* Month navigation */}
      <div className="mb-3 flex items-center justify-between">
        <button onClick={prevMonth} className="rounded p-1 hover:bg-gray-100">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <div className="text-center leading-tight">
          <p className="text-lg font-medium">{format(monthStart, "MMMM")}</p>
          <p className="text-xs text-gray-500">{format(monthStart, "yyyy")}</p>
        </div>

        <button onClick={nextMonth} className="rounded p-1 hover:bg-gray-100">
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Weekday pills */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
          <div
            key={d}
            className="bg-blue-800 text-white text-xs font-medium py-1 text-center rounded"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 border border-blue-300">
        {weeks.map((week, _wi) =>
          week.map(({ date, isCurrent, isToday }, _di) => {
            const key = format(date, "yyyy-MM-dd");
            const evt = eventsByDate[key];

            return (
              <div
                key={key}
                onClick={() => evt && onEventClick?.(evt)}
                className={[
                  evt ? "cursor-pointer hover:bg-blue-50" : "",
                  "relative aspect-square w-full border-r border-b border-blue-300 p-1 text-sm",
                  isCurrent ? "text-gray-800" : "text-gray-400",
                  isToday && "bg-blue-200 text-blue-900 font-semibold",
                  _wi === 0 && _di === 0 && "rounded-tl-lg",
                  _wi === 0 && _di === 6 && "rounded-tr-lg",
                  _wi === weeks.length - 1 && _di === 0 && "rounded-bl-lg",
                  _wi === weeks.length - 1 && _di === 6 && "rounded-br-lg",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="absolute top-1 left-1">
                  {format(date, "d")}
                </span>
                {evt && (
                  <div className="absolute bottom-1 left-1 right-1 bg-blue-100 text-xs text-blue-800 px-1 py-0.5 rounded">
                    {evt.label}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ),
  onEventClick: PropTypes.func,
};

Calendar.defaultProps = {
  events: [],
  onEventClick: null,
};
