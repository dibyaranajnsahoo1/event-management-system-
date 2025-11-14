import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProfile, fetchProfiles, updateTimezone } from '../features/profiles/profilesSlice';

export default function ProfilesPanel({ onSelectProfile }) {
  const profiles = useSelector(s => s.profiles.list);
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleAdd = async () => {
    if (!name) return;
    await dispatch(createProfile(name));
    setName('');
    dispatch(fetchProfiles());
  };

  return (
    <div style={{ border: '1px solid #eee', padding: 12, borderRadius:8, background:'#fff' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Profile name" />
        <button onClick={handleAdd}>+ Add profile</button>
      </div>

      <div style={{ marginTop: 12 }}>
        {profiles.map(p => (
          <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', padding: 8, borderBottom: '1px solid #f1f1f1' }}>
            <div onClick={() => onSelectProfile(p)} style={{ cursor: 'pointer' }}>{p.name}</div>
            <div>
              <select value={p.timezone || 'UTC'} onChange={e => dispatch(updateTimezone({ id: p._id, timezone: e.target.value }))}>
                <option value="UTC">UTC</option>
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
