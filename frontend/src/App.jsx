import React, { useEffect, useState } from 'react';
import LeftHeader from './components/LeftHeader';
import ProfilesPanel from './components/ProfilesPanel';
import CreateEventPanel from './components/CreateEventPanel';
import EventsPanel from './components/EventsPanel';
import { useDispatch } from 'react-redux';
import { fetchProfiles } from './features/profiles/profilesSlice';
import { fetchEvents } from './features/events/eventsSlice';

export default function App() {
  const dispatch = useDispatch();
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    dispatch(fetchProfiles());
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="app-container" style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ width: '30%' }}>
          <LeftHeader />
          <ProfilesPanel onSelectProfile={setSelectedProfile} />
        </div>

        <div style={{ width: '70%' }}>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <CreateEventPanel />
            </div>
            <div style={{ flex: 1 }}>
              <EventsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
