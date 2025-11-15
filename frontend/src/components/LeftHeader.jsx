import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { createProfile } from "../features/profiles/profilesSlice";

export default function LeftHeader({ selectedProfile, setSelectedProfile }) {
  const profiles = useSelector((s) => s.profiles.list);
  const dispatch = useDispatch();

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const options = profiles.map((p) => ({
    value: p,
    label: p.name,
  }));

  const handleAdd = async () => {
    if (!newName.trim()) return;
    await dispatch(createProfile(newName));
    setNewName("");
    setIsAdding(false);
  };

  // Dropdown custom footer
  const footer = (
    <div style={{ padding: 8, borderTop: "1px solid #eee" }}>
      {!isAdding ? (
        <button onClick={() => setIsAdding(true)}>+ Add profile</button>
      ) : (
        <div style={{ display: "flex", gap: 6 }}>
          <input
            placeholder="Profile name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ flex: 1 }}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        paddingBottom: 20,
        borderBottom: "1px solid #eee",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: "80%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Event Management System</h2>

        {/* Right Select Box */}
        <div style={{ width: 260 }}>
          <Select
            value={
              selectedProfile ? { value: selectedProfile, label: selectedProfile.name } : null
            }
            onChange={(e) => setSelectedProfile(e.value)}
            options={options}
            placeholder="Select a profile..."
            isSearchable
            components={{
              MenuList: (props) => (
                <>
                  {props.children}
                  {footer}
                </>
              ),
            }}
            styles={{
              container: (base) => ({ ...base, width: "100%" }),
            }}
          />
        </div>
      </div>
    </div>
  );
}
