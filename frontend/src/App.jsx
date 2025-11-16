import React, { useEffect, useState } from "react";
import LeftHeader from "./components/LeftHeader";
import CreateEventPanel from "./components/CreateEventPanel";
import EventsPanel from "./components/EventsPanel";
import { useDispatch } from "react-redux";
import { fetchProfiles } from "./features/profiles/profilesSlice";
import { fetchEvents } from "./features/events/eventsSlice";

export default function App() {
  const dispatch = useDispatch();

  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  
  useEffect(() => {
    if (selectedProfile) {
      dispatch(fetchEvents(selectedProfile._id));
    } else {
      dispatch(fetchEvents());
    }
  }, [selectedProfile, dispatch]);

  return (
    <div style={{marginTop:"50px",minHeight: "100vh", background: "#f8f9fc" }}>
      
   
      <LeftHeader
        selectedProfile={selectedProfile}
        setSelectedProfile={setSelectedProfile}
      />

      <div style={{
          width: "80%",
          margin: "20px auto",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >

        <div style={{ width: "50%" }}>
          <CreateEventPanel />
        </div>
        <div style={{ width: "50%" }}>
          <EventsPanel selectedProfile={selectedProfile} />
        </div>
      </div>
      <div style={{display:"none"}}>@Dibya ranjan sahoo</div>
    </div>
  );
}
