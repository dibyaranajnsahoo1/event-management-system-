import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProfile, fetchProfiles } from "../features/profiles/profilesSlice";
import "./SelectProfileDropdown.css";

export default function SelectProfileDropdown({ selectedProfile, setSelectedProfile }) {
  const profiles = useSelector((s) => s.profiles.list || []);
  const dispatch = useDispatch();

  const SearchIcon = () => (
    <svg width="16" height="16" fill="none" stroke="#111" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const ref = useRef(null);

  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setAdding(false);
      }
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filtered = profiles.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async () => {
    if (!newName.trim()) return;

    const alreadyExists = profiles.some(
      (p) => p.name.trim().toLowerCase() === newName.trim().toLowerCase()
    );

    if (alreadyExists) {
      alert("Profile already exists!");
      return;
    }

    const res = await dispatch(createProfile(newName.trim()))
      .unwrap()
      .catch(() => null);

    if (res) {
      await dispatch(fetchProfiles());
      setSelectedProfile(res);
      setNewName("");
      setAdding(false);
    }
  };

  return (
    <div ref={ref} className="spd-container">
      <div className="spd-select-box" onClick={() => setOpen(true)}>
        <div className="spd-selected-text">
          {selectedProfile ? selectedProfile.name : "Select current profile..."}
        </div>
        <div className="spd-arrow">▾</div>
      </div>

      {open && (
        <div className="spd-dropdown">

          <div className="spd-search-wrapper">
            <span className="spd-search-icon"><SearchIcon /></span>

            <input
              className="spd-input"
              style={{ paddingLeft: 34 }}
              placeholder="Search current profile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="event-line" />

          <div className="spd-list">
            {filtered.map((p) => {
              const selected = selectedProfile?._id === p._id;

              return (
                <div
                  key={p._id}
                  className={`spd-item ${selected ? "spd-selected" : ""}`}
                  onClick={() => {
                    setSelectedProfile(p);
                    setAdding(false);
                  }}
                >
                  <span className="spd-check">{selected ? "✔" : ""}</span>
                  <span className="spd-name">{p.name}</span>
                </div>
              );
            })}
          </div>

          <div className="event-line" />

          {!adding ? (
            <div className="spd-add-btn" onClick={() => setAdding(true)}>
              <span className="spd-plus">＋</span>
              <span className="spd-add-text">Add Profile</span>
            </div>
          ) : (
            <div className="spd-add-row">
              <input
                className="spd-input2"
                placeholder="Profile name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button className="btn btn-purple" onClick={handleAdd}>Add</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
