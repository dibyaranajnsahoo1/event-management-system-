import React, { useState } from "react";
import SelectProfileDropdown from "./SelectProfileDropdown";

export default function LeftHeader({ selectedProfile, setSelectedProfile }) {
  const [showAddInline, setShowAddInline] = useState(false);

  const toggleInlineAdd = () => {
    setShowAddInline((prev) => !prev);
  };

  return (
    <div className="header-row">
      <div>
        <h1 style={{ margin: 0 }}>Event Management System</h1>
        <div className="muted" style={{ marginTop: 6 }}>
          Create and manage events across multiple timezones
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <SelectProfileDropdown
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
          onAddProfileClick={toggleInlineAdd}
        />
      </div>
    </div>
  );
}
