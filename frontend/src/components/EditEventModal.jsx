import React, { useState } from 'react';
import api from '../api/api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function EditEventModal({ event, onClose }) {
  const [timezone, setTimezone] = useState(event.timezone);
  const [startDate, setStartDate] = useState(dayjs(event.startTimeUTC).tz(timezone).format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState(dayjs(event.startTimeUTC).tz(timezone).format('HH:mm'));
  const [endDate, setEndDate] = useState(dayjs(event.endTimeUTC).tz(timezone).format('YYYY-MM-DD'));
  const [endTime, setEndTime] = useState(dayjs(event.endTimeUTC).tz(timezone).format('HH:mm'));

  const handleSave = async () => {
    const startISO = dayjs.tz(`${startDate}T${startTime}`, timezone).toISOString();
    const endISO = dayjs.tz(`${endDate}T${endTime}`, timezone).toISOString();
    if (dayjs(endISO).isBefore(dayjs(startISO))) return alert('End must be after start');

    await api.put(`/events/${event._id}`, { timezone, startISO, endISO, updatedBy: event.profiles[0]?._id });
    onClose();
    window.location.reload();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Edit Event</h4>
        <div>
          <label>Timezone</label>
          <select value={timezone} onChange={e => setTimezone(e.target.value)}>
            <option value="UTC">UTC</option>
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop:10 }}>
          <div style={{ flex: 7 }}>
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div style={{ flex: 3 }}>
            <label>Start Time</label>
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <div style={{ flex: 7 }}>
            <label>End Date</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
          <div style={{ flex: 3 }}>
            <label>End Time</label>
            <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} style={{ marginLeft:8 }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
