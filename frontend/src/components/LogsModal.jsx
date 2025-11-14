import React, { useEffect, useState } from 'react';
import api from '../api/api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function LogsModal({ eventId, onClose }) {
  const [logs, setLogs] = useState([]);
  const [viewerTZ, setViewerTZ] = useState('UTC');

  useEffect(() => {
    api.get(`/events/${eventId}/logs`).then(r => setLogs(r.data));
  }, [eventId]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Event Update History</h4>
        <select value={viewerTZ} onChange={e => setViewerTZ(e.target.value)}>
          <option value="UTC">UTC</option>
          <option value="Asia/Kolkata">Asia/Kolkata</option>
          <option value="America/New_York">America/New_York</option>
        </select>

        <div>
          {logs.map(l => (
            <div key={l._id} style={{ borderTop: '1px solid #eee', padding: 8 }}>
              <div style={{ fontWeight:600 }}>{dayjs(l.updatedAtUTC).tz(viewerTZ).format('MMM D, YYYY [at] h:mm a')}</div>
              <div style={{ color:'#444' }}>By: {l.updatedBy?.name || 'Unknown'}</div>
              <div style={{ marginTop:8 }}>
                <b>Previous:</b>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(l.previous, null, 2)}</pre>
              </div>
              <div>
                <b>Current:</b>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(l.current, null, 2)}</pre>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
