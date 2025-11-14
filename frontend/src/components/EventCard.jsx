import React, { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import LogsModal from './LogsModal';
import EditEventModal from './EditEventModal';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function EventCard({ event }) {
  const [showLogs, setShowLogs] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const viewerTZ = (event.profiles && event.profiles[0] && event.profiles[0].timezone) || 'UTC';

  const startStr = dayjs(event.startTimeUTC).tz(viewerTZ).format('MMM D, YYYY');
  const startTime = dayjs(event.startTimeUTC).tz(viewerTZ).format('h:mm a');
  const endStr = dayjs(event.endTimeUTC).tz(viewerTZ).format('MMM D, YYYY');
  const endTime = dayjs(event.endTimeUTC).tz(viewerTZ).format('h:mm a');
  const created = dayjs(event.createdAtUTC).tz(viewerTZ).format('MMM D, YYYY [at] h:mm a');

  return (
    <div style={{ borderTop: '1px solid #eee', padding: 12 }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ width: 48, height: 48, background: '#ddd', borderRadius: 24 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight:600 }}>{event.profiles.map(p => p.name).join(', ')}</div>
          <div style={{ marginTop:6 }}>{startStr} · {startTime} <span style={{ marginLeft: 8 }}>📅</span></div>
          <div>{endStr} · {endTime} <span style={{ marginLeft: 8 }}>📅</span></div>
          <hr style={{ marginTop:10, marginBottom:10 }} />
          <div style={{ color:'#666' }}>Created {created}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button onClick={() => setShowEdit(true)}>✏️ Edit</button>
          <button onClick={() => setShowLogs(true)}>📜 View Logs</button>
        </div>
      </div>

      {showEdit && <EditEventModal event={event} onClose={() => setShowEdit(false)} />}
      {showLogs && <LogsModal eventId={event._id} onClose={() => setShowLogs(false)} />}
    </div>
  );
}
