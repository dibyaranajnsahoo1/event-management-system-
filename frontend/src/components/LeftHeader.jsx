import React from 'react';
export default function LeftHeader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:12 }}>
      <h2>Event Management System</h2>
      <div>
        {/* profile select or other controls could go here */}
      </div>
    </div>
  );
}
