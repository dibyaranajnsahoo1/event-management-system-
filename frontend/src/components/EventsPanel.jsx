import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import EventCard from "./EventCard";
import TimeZoneSelector from "./TimeZoneSelector";
import { fetchEvents } from "../features/events/eventsSlice";

export default function EventsPanel({ selectedProfile }) {
  const dispatch = useDispatch();

  const events = useSelector((state) => state.events.list || []);
  const initialTZ =
    selectedProfile?.timezone || "America/New_York";

  const [viewerTZ, setViewerTZ] = useState(initialTZ);

  useEffect(() => {
    setViewerTZ(selectedProfile?.timezone || "America/New_York");
  }, [selectedProfile]);

  useEffect(() => {
    dispatch(fetchEvents(selectedProfile?._id));
  }, [dispatch, selectedProfile]);

  return (
    <div className="card">
      <div style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ margin: 0 }}>Events</h3>
          <div className="" style={{ marginTop: 6 }}>
            View in Timezone
          </div>
        </div>

        <TimeZoneSelector value={viewerTZ} onChange={setViewerTZ} />
      </div>

      <div style={{ marginTop: 12 }}>
        {events.length === 0 ? (
          <div style={{ height: 220, textAlign:"center", marginTop:30 }}>
            No events found
          </div>
        ) : (
          events.map((ev) => (
            <EventCard key={ev._id} event={ev} viewerTZ={viewerTZ} />
          ))
        )}
      </div>
    </div>
  );
}
