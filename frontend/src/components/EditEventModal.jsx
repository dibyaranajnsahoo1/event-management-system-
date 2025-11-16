import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../features/events/eventsSlice";
import api from "../api/api";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

import SelectProfileDropdownMulti from "./SelectProfileDropdownMulti";
import TimeZoneSelector from "./TimeZoneSelector";
import DateInput from "./DateInput";

import "./EditEventModal.css";

export default function EditEventModal({ event, onClose }) {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(event.profiles || []);
  const [timezoneVal, setTimezoneVal] = useState(event.timezone || "UTC");

  const [startDate, setStartDate] = useState(
    dayjs(event.startTimeUTC).tz(timezoneVal).format("YYYY-MM-DD")
  );
  const [startTime, setStartTime] = useState(
    dayjs(event.startTimeUTC).tz(timezoneVal).format("HH:mm")
  );

  const [endDate, setEndDate] = useState(
    dayjs(event.endTimeUTC).tz(timezoneVal).format("YYYY-MM-DD")
  );
  const [endTime, setEndTime] = useState(
    dayjs(event.endTimeUTC).tz(timezoneVal).format("HH:mm")
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStartDate(dayjs(event.startTimeUTC).tz(timezoneVal).format("YYYY-MM-DD"));
    setStartTime(dayjs(event.startTimeUTC).tz(timezoneVal).format("HH:mm"));

    setEndDate(dayjs(event.endTimeUTC).tz(timezoneVal).format("YYYY-MM-DD"));
    setEndTime(dayjs(event.endTimeUTC).tz(timezoneVal).format("HH:mm"));
  }, [timezoneVal, event]);

  const handleSave = async () => {
    if (!selected.length) {
      alert("Select at least one profile");
      return;
    }
    const startISO = dayjs(`${startDate}T${startTime}`).tz(timezoneVal).toISOString();
    const endISO = dayjs(`${endDate}T${endTime}`).tz(timezoneVal).toISOString();

    if (dayjs(endISO).isBefore(dayjs(startISO))) {
      alert("End must be after start");
      return;
    }

    setLoading(true);

    try {
      await api.put(`/events/${event._id}`, {
        profiles: selected.map((p) => p._id),
        timezone: timezoneVal,
        startISO,
        endISO,
        updatedBy: selected[0]._id,
      });

      await dispatch(fetchEvents());
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal-container">
      <div className="edit-header">
        <h3>Edit Event</h3>
        <button className="edit-close-btn" onClick={onClose}>✕</button>
      </div>
      <div className="edit-block">
        <div className="edit-label">Profiles</div>
        <SelectProfileDropdownMulti value={selected} onChange={setSelected} />
      </div>

      <div className="edit-block">
        <div className="edit-label">Timezone</div>
        <TimeZoneSelector value={timezoneVal} onChange={setTimezoneVal} />
      </div>

      <div className="edit-row">
        <div className="edit-col-7">
          <div className="edit-label">Start Date</div>
          <DateInput value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div className="edit-col-3">
          <div className="edit-label">Start Time</div>
          <input
            type="time"
            className="edit-input"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
      </div>

      <div className="edit-row">
        <div className="edit-col-7">
          <div className="edit-label">End Date</div>
          <DateInput value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <div className="edit-col-3">
          <div className="edit-label">End Time</div>
          <input
            type="time"
            className="edit-input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <div className="edit-btn-row">
        <button className="edit-btn-outline" onClick={onClose}>Cancel</button>
        <button className="edit-btn-purple" onClick={handleSave}>
          {loading ? "Updating..." : "Update Event"}
        </button>
      </div>
    </div>
  );
}
