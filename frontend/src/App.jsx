import React, { useEffect, useState } from "react";
import LeftHeader from "./components/LeftHeader";
import ProfilesPanel from "./components/ProfilesPanel";
import CreateEventPanel from "./components/CreateEventPanel";
import EventsPanel from "./components/EventsPanel";
import { useDispatch } from "react-redux";
import { fetchProfiles } from "./features/profiles/profilesSlice";
import { fetchEvents } from "./features/events/eventsSlice";

export default function App() {
  const dispatch = useDispatch();
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Load all profiles on first render
  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  // Load events based on selected profile
  useEffect(() => {
    if (selectedProfile) {
      dispatch(fetchEvents(selectedProfile._id));
    } else {
      dispatch(fetchEvents());
    }
  }, [selectedProfile, dispatch]);

  return (
    <div>
      {/* Header Section */}
      <LeftHeader
        selectedProfile={selectedProfile}
        setSelectedProfile={setSelectedProfile}
      />

      {/* Main Section */}
      <div
        style={{
          width: "80%",
          margin: "20px auto",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* LEFT → Create Event */}
        <div style={{ width: "50%" }}>
          <CreateEventPanel />
        </div>

        {/* RIGHT → Events */}
        <div style={{ width: "50%" }}>
          <EventsPanel selectedProfile={selectedProfile} />
        </div>
      </div>
    </div>
  );
}
