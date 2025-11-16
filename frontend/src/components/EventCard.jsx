import React, { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import EditEventModal from "./EditEventModal";
import LogsModal from "./LogsModal";

import "./EventCard.css";

dayjs.extend(utc);
dayjs.extend(timezone);

const UserIcon = () => (
  <svg width="20" height="20" stroke="#7c3aed" strokeWidth="2" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="15" height="15" stroke="#6b7280" strokeWidth="2" fill="none" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const TimeIcon = () => (
  <svg width="12" height="12" stroke="#6b7280" strokeWidth="2" fill="none" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const EditIcon = () => (
  <svg width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" viewBox="0 0 24 24">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2 2 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const LogsIcon = () => (
  <svg width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" viewBox="0 0 24 24">
    <path d="M9 12h6" />
    <path d="M9 16h6" />
    <path d="M9 8h6" />
    <rect x="4" y="4" width="16" height="16" rx="2" />
  </svg>
);

const fmtDate  = (d, tz) => dayjs(d).tz(tz).format("MMM D, YYYY");
const fmtTime  = (d, tz) => dayjs(d).tz(tz).format("h:mm A");
const fmtFull  = (d, tz) => dayjs(d).tz(tz).format("MMM D, YYYY [at] h:mm A");

export default function EventCard({ event, viewerTZ }) {
  const activeTZ =
    viewerTZ ||
    event.timezone ||
    event.profiles?.[0]?.timezone ||
    "UTC";

  const [showEdit, setShowEdit] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div className="event-card">

      <div className="event-user-row">
        <UserIcon />
        <span className="event-username">
          {event.profiles.map(p => p.name).join(", ")}
        </span>
      </div>

      <div className="event-row">
        <CalendarIcon />
        <div className="event-col">
          <span className="event-date">
            Start: {fmtDate(event.startTimeUTC, activeTZ)}
          </span>
          <div className="event-time-row">
            <TimeIcon />
            {fmtTime(event.startTimeUTC, activeTZ)}
          </div>
        </div>
      </div>

      <div className="event-row">
        <CalendarIcon />
        <div className="event-col">
          <span className="event-date">
            End: {fmtDate(event.endTimeUTC, activeTZ)}
          </span>
          <div className="event-time-row">
            <TimeIcon />
            {fmtTime(event.endTimeUTC, activeTZ)}
          </div>
        </div>
      </div>

      <div className="event-line" />

      <div className="event-meta">
        Created: {fmtFull(event.createdAtUTC, activeTZ)}
      </div>

      {event.updatedAtUTC && (
        <div className="event-meta" style={{ marginTop: 4 }}>
          Updated: {fmtFull(event.updatedAtUTC, activeTZ)}
        </div>
      )}

      <div className="event-line" />

      <div className="event-btn-grid">
        <button className="event-btn" onClick={() => setShowEdit(true)}>
          <EditIcon /> Edit
        </button>

        <button className="event-btn" onClick={() => setShowLogs(true)}>
          <LogsIcon /> View Logs
        </button>
      </div>

      {showEdit && (
        <div className="modal">
          <div className="modal-inner">
            <EditEventModal event={event} onClose={() => setShowEdit(false)} />
          </div>
        </div>
      )}

      {showLogs && (
        <div className="modal">
          <div className="modal-inner">
           <LogsModal 
            eventId={event._id} 
            onClose={() => setShowLogs(false)} 
            viewerTZ={activeTZ}
          />

          </div>
        </div>
      )}
    </div>
  );
}
