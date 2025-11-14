import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../features/events/eventsSlice';
import EventCard from './EventCard';

export default function EventsPanel() {
  const events = useSelector(s => s.events.list);
  const profiles = useSelector(s => s.profiles.list);
  const dispatch = useDispatch();
  const [filterProfile, setFilterProfile] = useState('');

  useEffect(() => { dispatch(fetchEvents(filterProfile || undefined)); }, [dispatch, filterProfile]);

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius:8, background:'#fff' }}>
      <h3>Events</h3>
      <p>Events assigned to selected profile or all</p>
      <select value={filterProfile} onChange={e => setFilterProfile(e.target.value)}>
        <option value="">All</option>
        {profiles.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
      </select>

      <div style={{ marginTop: 12 }}>
        {events.length === 0 && <div style={{ color:'#666' }}>No events yet</div>}
        {events.map(ev => (
          <EventCard key={ev._id} event={ev} />
        ))}
      </div>
    </div>
  );
}
