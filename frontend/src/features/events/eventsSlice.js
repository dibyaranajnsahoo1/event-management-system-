import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchEvents = createAsyncThunk('events/fetch', async (profileId) => {
  const url = profileId ? `/events?profileId=${profileId}` : '/events';
  const res = await api.get(url);
  return res.data;
});

export const createEvent = createAsyncThunk('events/create', async (payload) => {
  const res = await api.post('/events', payload);
  return res.data;
});

export const updateEvent = createAsyncThunk('events/update', async ({ id, payload }) => {
  const res = await api.put(`/events/${id}`, payload);
  return res.data;
});

const slice = createSlice({
  name: 'events',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(createEvent.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const ev = action.payload.event || action.payload;
        const idx = state.list.findIndex(e => e._id === ev._id);
        if (idx >= 0) state.list[idx] = ev;
      });
  }
});

export default slice.reducer;
