import React, { useState } from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../features/events/eventsSlice';
import api from '../api/api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function CreateEventPanel() {
  const profiles = useSelector(s => s.profiles.list);
  const dispatch = useDispatch();
  const options = profiles.map(p => ({ value: p._id, label: p.name }));

  const [selected, setSelected] = useState([]);
  const [timezone, setTimezone] = useState('UTC');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('10:00');

  const handleCreate = async () => {
    if (!selected.length) return alert('Select at least one profile');
    if (!startDate || !endDate) return alert('Select dates');
    const startISO = dayjs.tz(`${startDate}T${startTime}`, timezone).toISOString();
    const endISO = dayjs.tz(`${endDate}T${endTime}`, timezone).toISOString();
    if (dayjs(endISO).isBefore(dayjs(startISO))) return alert('End must be after start');

    await api.post('/events', { profiles: selected.map(s => s.value), timezone, startISO, endISO });
    dispatch(fetchEvents());
    setSelected([]);
    setStartDate(''); setEndDate('');
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius:8, background:'#fff' }}>
      <h3>Create Event</h3>

      <div style={{ marginBottom: 8 }}>
        <label>Profiles</label>
        <Select isMulti options={options} value={selected} onChange={setSelected} />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Timezone</label>
        <select value={timezone} onChange={e => setTimezone(e.target.value)} style={{ width: '100%' }}>
          <option value="UTC">UTC</option>
          <option value="Asia/Kolkata">Asia/Kolkata</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/London">Europe/London</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 7 }}>
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ flex: 3 }}>
          <label>Start Time</label>
          <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} style={{ width: '100%' }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <div style={{ flex: 7 }}>
          <label>End Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div style={{ flex: 3 }}>
          <label>End Time</label>
          <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} style={{ width: '100%' }} />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={handleCreate}>+ Create Event</button>
      </div>
    </div>
  );
}
