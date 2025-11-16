import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProfile, fetchProfiles } from "../features/profiles/profilesSlice";
import "./SelectProfileDropdownMulti.css";

export default function SelectProfileDropdownMulti({ value, onChange }) {
  const profiles = useSelector((s) => s.profiles.list || []);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const SearchIcon = () => (
    <svg width="16" height="16" fill="none" stroke="#111" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

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

  // Filter profiles
  const filtered = profiles.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ⭐ Prevent duplicate names
  const handleAdd = async () => {
    const name = newName.trim();
    if (!name) return;

    const exists = profiles.some(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      alert("Profile already exists!");
      return;
    }

    const res = await dispatch(createProfile(name))
      .unwrap()
      .catch(() => null);

    if (res) {
      await dispatch(fetchProfiles());
      onChange([...(value || []), res]);
      setNewName("");
      setAdding(false);
    }
  };

  const toggleSelect = (p) => {
    const exists = value.some((v) => v._id === p._id);

    if (exists) onChange(value.filter((v) => v._id !== p._id));
    else onChange([...value, p]);
    setAdding(false);
  };

  return (
    <div ref={ref} className="spdm-container">
      <div className="spdm-select-box" onClick={() => setOpen((o) => !o)}>
        {value.length === 0
          ? "Select profiles..."
          : `${value.length} profile(s) selected`}
      </div>

      {open && (
        <div className="spdm-dropdown">
          <div className="spdm-search-wrapper">
            <span className="spdm-search-icon">
              <SearchIcon />
            </span>

            <input
              className="spdm-input"
              placeholder="Search profiles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="event-line" />

          <div className="spdm-list">
            {filtered.map((p) => {
              const selected = value.some((v) => v._id === p._id);

              return (
                <div
                  key={p._id}
                  onClick={() => toggleSelect(p)}
                  className={`spdm-item ${selected ? "spdm-selected" : ""}`}
                >
                  <span className="spdm-check">{selected ? "✔" : ""}</span>
                  <span className="spdm-name">{p.name}</span>
                </div>
              );
            })}
          </div>

          <div className="event-line" />

          {!adding ? (
            <div className="spdm-add-btn" onClick={() => setAdding(true)}>
              <span className="spdm-plus">＋</span>
              <span className="spdm-add-text">Add Profile</span>
            </div>
          ) : (
            <div className="spdm-add-row">
              <input
                className="spdm-input2"
                placeholder="Profile name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />

              <button className="btn btn-purple" onClick={handleAdd}>
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
