import React, { useEffect, useState } from "react";
import api from "../api/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function getNamesFromIds(list, map) {
  return list.map(id => map[id] || id);
}

function detectChange(log, map) {
  if (!log.previous || !log.current) return "Updated";

  const prev = log.previous;
  const curr = log.current;

  if (JSON.stringify(prev.profiles) !== JSON.stringify(curr.profiles)) {
    const names = getNamesFromIds(curr.profiles, map);
    return `Profiles changed to: ${names.join(", ")}`;
  }

  if (prev.timezone !== curr.timezone) return `Timezone changed to: ${curr.timezone}`;
  if (prev.startTimeUTC !== curr.startTimeUTC) return "Start date/time updated";
  if (prev.endTimeUTC !== curr.endTimeUTC) return "End date/time updated";

  return "Updated";
}
export default function LogsModal({ eventId, onClose, viewerTZ }) {
  const [logs, setLogs] = useState([]);
  const [profilesMap, setProfilesMap] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const logRes = await api.get(`/events/${eventId}/logs`);
        setLogs(logRes.data || []);

        const profileRes = await api.get("/profiles");
        const map = {};
        profileRes.data.forEach(p => map[p._id] = p.name);
        setProfilesMap(map);

      } catch (err) {
        setLogs([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [eventId]);

  return (
    <div className="logs-modal-wrapper">
      
      <div className="logs-header">
        <h3>Event Update History</h3>
        <button className="logs-close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="logs-body">

        {loading && <div className="logs-muted">Loading logs...</div>}

        {!loading && logs.length === 0 && (
          <div className="logs-muted logs-center">No update history yet</div>
        )}

        {logs.map(log => (
          <div key={log._id} className="log-entry">

            <div className="log-row">
              <ClockIcon />
              {dayjs(log.updatedAtUTC)
                .tz(viewerTZ)
                .format("MMM DD, YYYY [at] hh:mm A")}
            </div>

            <div className="log-msg">
              {detectChange(log, profilesMap)}
            </div>

          </div>
        ))}

      </div>

      <style>
        {`
          .logs-modal-wrapper {
            position: relative;
          }
          .logs-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logs-close-btn {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid #ddd;
            background: #fff;
            cursor: pointer;
          }
          .logs-body {
            margin-top: 18px;
          }
          .logs-muted {
            color: #6b7280;
            font-size: 14px;
          }
          .logs-center {
            text-align: center;
          }
          .log-entry {
            background: #f9fafb;
            padding: 14px 16px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            margin-bottom: 14px;
          }
          .log-row {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #6b7280;
            font-size: 14px;
          }
          .log-msg {
            margin-top: 8px;
            font-size: 15px;
            font-weight: 500;
            color: #111;
          }
        `}
      </style>

    </div>
  );
}
