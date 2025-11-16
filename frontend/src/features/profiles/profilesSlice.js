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



const slice = createSlice({
  name: 'profiles',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfiles.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(createProfile.fulfilled, (state, action) => { state.list.push(action.payload); })
      
  }
});

export default slice.reducer;
