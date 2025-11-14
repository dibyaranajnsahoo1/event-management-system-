import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './../features/profiles/profilesSlice';
import eventsReducer from './../features/events/eventsSlice';

export default configureStore({
  reducer: {
    profiles: profilesReducer,
    events: eventsReducer,
  },
});
