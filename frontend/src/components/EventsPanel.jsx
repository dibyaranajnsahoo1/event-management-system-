import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../features/events/eventsSlice";
import EventCard from "./EventCard";

export default function EventsPanel({ selectedProfile }) {
  const events = useSelector((s) => s.events.list);
  const dispatch = useDispatch();

  // ⭐ Auto fetch and filter based on selected profile
  useEffect(() => {
    dispatch(fetchEvents(selectedProfile ? selectedProfile._id : undefined));
  }, [dispatch, selectedProfile]);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 12,
        borderRadius: 8,
        background: "#fff",
      }}
    >
      <h3>Events</h3>

      <p style={{ marginTop: -5 }}>
        Showing events for:{" "}
        <b>{selectedProfile ? selectedProfile.name : "All Profiles"}</b>
      </p>

      <div style={{ marginTop: 12 }}>
        {events.length === 0 && (
          <div style={{ color: "#666" }}>No events available</div>
        )}

        {events.map((ev) => (
          <EventCard key={ev._id} event={ev} />
        ))}
      </div>
    </div>
  );
}
