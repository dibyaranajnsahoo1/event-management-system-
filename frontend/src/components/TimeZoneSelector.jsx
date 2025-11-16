import React, { useState, useRef, useEffect } from "react";
import "./TimeZoneSelector.css";

export default function TimeZoneSelector({ value, onChange }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const SearchIcon = () => (
    <svg width="16" height="16" fill="none" stroke="#111" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  const timezones = [
    { label: "Eastern Time (ET)", value: "America/New_York" },
    { label: "India Standard Time (IST)", value: "Asia/Kolkata" },
    { label: "Greenwich Mean Time (GMT)", value: "Europe/London" },
    { label: "Central European Time (CET)", value: "Europe/Berlin" },
    { label: "Pacific Time (PT)", value: "America/Los_Angeles" },
    { label: "Mountain Time (MT)", value: "America/Denver" },
    { label: "Central Time (CT)", value: "America/Chicago" },
    { label: "Japan Standard Time (JST)", value: "Asia/Tokyo" },
    { label: "China Standard Time (CST)", value: "Asia/Shanghai" },
    { label: "Singapore Time (SGT)", value: "Asia/Singapore" },
    { label: "Australian Eastern Time (AET)", value: "Australia/Sydney" },
    { label: "Dubai Time (GST)", value: "Asia/Dubai" },
    { label: "Moscow Time (MSK)", value: "Europe/Moscow" },
    { label: "South Africa Time (SAST)", value: "Africa/Johannesburg" },
    { label: "Brazil Time (BRT)", value: "America/Sao_Paulo" },
  ];

  const filtered = timezones.filter((tz) =>
    tz.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="tz-container">
      <div className="tz-select-box" onClick={() => setOpen((o) => !o)}>
        <span>
          {timezones.find((t) => t.value === value)?.label || "Select timezone..."}
        </span>
        <span className="tz-caret">▾</span>
      </div>

      {open && (
        <div className="tz-dropdown">
          <div className="tz-search-wrapper">
            <span className="tz-search-icon"><SearchIcon /></span>

            <input
              className="tz-input"
              placeholder="Search timezone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="tz-list">
            {filtered.map((tz) => {
              const selected = tz.value === value;

              return (
                <div
                  key={tz.value}
                  className={`tz-item ${selected ? "tz-selected" : ""}`}
                  onClick={() => {
                    onChange(tz.value);
                    setOpen(false);
                  }}
                >
                  <span className="tz-check">{selected ? "✔" : ""}</span>
                  {tz.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
