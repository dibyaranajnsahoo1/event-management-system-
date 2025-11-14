import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchProfiles = createAsyncThunk('profiles/fetch', async () => {
  const res = await api.get('/profiles');
  return res.data;
});

export const createProfile = createAsyncThunk('profiles/create', async (name) => {
  const res = await api.post('/profiles', { name });
  return res.data;
});

export const updateTimezone = createAsyncThunk('profiles/updateTZ', async ({ id, timezone }) => {
  const res = await api.put(`/profiles/${id}/timezone`, { timezone });
  return res.data;
});

const slice = createSlice({
  name: 'profiles',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfiles.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(createProfile.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(updateTimezone.fulfilled, (state, action) => {
        const idx = state.list.findIndex(p => p._id === action.payload._id);
        if (idx >= 0) state.list[idx] = action.payload;
      });
  }
});

export default slice.reducer;
