import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../features/events/eventsSlice";
import api from "../api/api";
import dayjs from "dayjs";

import SelectProfileDropdownMulti from "./SelectProfileDropdownMulti";
import TimeZoneSelector from "./TimeZoneSelector";
import DateInput from "./DateInput";

import "./CreateEventPanel.css";

export default function CreateEventPanel() {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState([]);
  const [timezoneVal, setTimezoneVal] = useState("America/New_York");

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("10:00");

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (selected.length === 0) {
      alert("Select at least one profile");
      return;
    }

    if (!startDate || !endDate) {
      alert("Pick both start and end dates");
      return;
    }

    const startISO = dayjs(`${startDate}T${startTime}`).tz(timezoneVal).toISOString();
    const endISO = dayjs(`${endDate}T${endTime}`).tz(timezoneVal).toISOString();

    if (dayjs(endISO).isBefore(startISO)) {
      alert("End must be after start");
      return;
    }

    setLoading(true);

    try {
      await api.post("/events", {
        profiles: selected.map((p) => p._id),
        timezone: timezoneVal,
        startISO,
        endISO,
      });

      await dispatch(fetchEvents());

      setSelected([]);
      setStartDate("");
      setEndDate("");
      setStartTime("09:00");
      setEndTime("10:00");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cep-card">
      <h3 className="cep-title">Create Event</h3>

      <div className="cep-block">
        <div className="cep-label">Profiles</div>
        <SelectProfileDropdownMulti value={selected} onChange={setSelected} />
      </div>

      <div className="cep-block">
        <div className="cep-label">Timezone</div>
        <TimeZoneSelector value={timezoneVal} onChange={setTimezoneVal} />
      </div>

      <div className="cep-row">
        <div className="cep-col-7">
          <div className="cep-label">Start Date & Time</div>
          <DateInput value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="cep-col-3">
          <div className="cep-label">&nbsp;</div>
          <input
            className="cep-input"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
      </div>

      <div className="cep-row">
        <div className="cep-col-7">
          <div className="cep-label">End Date & Time</div>
          <DateInput value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="cep-col-3">
          <div className="cep-label">&nbsp;</div>
          <input
            className="cep-input"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <div className="cep-button-wrap">
        <button className="cep-btn-purple" onClick={handleCreate}>
          {loading ? "Creating..." : "+ Create Event"}
        </button>
      </div>
    </div>
  );
}
