import React, { useEffect, useState } from "react";
import api from "../api/api";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function getNamesFromIds(idList, profilesMap) {
  return idList.map((id) => profilesMap[id] || id);
}

function getChangeText(log, profilesMap) {
  if (!log.previous || !log.current) {
    return "Updated";
  }

  const oldData = log.previous;
  const newData = log.current;

  if (JSON.stringify(oldData.profiles) !== JSON.stringify(newData.profiles)) {
    const names = getNamesFromIds(newData.profiles, profilesMap);
    return "Profiles changed to: " + names.join(", ");
  }

  if (oldData.timezone !== newData.timezone) {
    return "Timezone changed to: " + newData.timezone;
  }

  if (oldData.startTimeUTC !== newData.startTimeUTC) {
    return "Start date/time updated";
  }

  if (oldData.endTimeUTC !== newData.endTimeUTC) {
    return "End date/time updated";
  }

  return "Updated";
}

export default function LogsModal({ eventId, onClose }) {
  const [logs, setLogs] = useState([]);
  const [profilesMap, setProfilesMap] = useState({});
  const [viewerTimezone, setViewerTimezone] = useState("UTC");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLogs() {
      try {
        setLoading(true);

        const logsResponse = await api.get(`/events/${eventId}/logs`);
        setLogs(logsResponse.data || []);

        const profilesResponse = await api.get("/profiles");
        const map = {};
        profilesResponse.data.forEach((p) => {
          map[p._id] = p.name;
        });
        setProfilesMap(map);
      } catch (error) {
        setLogs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
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

        {logs.map((log) => (
          <div key={log._id} className="log-entry">
            <div className="log-row">
              <ClockIcon />
              {dayjs(log.updatedAtUTC)
                .tz(viewerTimezone)
                .format("MMM DD, YYYY [at] hh:mm A")}
            </div>

            <div className="log-msg">
              {getChangeText(log, profilesMap)}
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
            font-size: 16px;
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
            margin-bottom: 14px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
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
