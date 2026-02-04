import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/activitiesApi';

export const fetchActivities = createAsyncThunk('activities/fetch', async () => {
  const res = await api.getAll();
  return res.data;
});
export const addActivity = createAsyncThunk('activities/add', async (payload) => {
  const res = await api.create(payload);
  return res.data;
});
export const deleteActivity = createAsyncThunk('activities/delete', async (id) => {
  await api.remove(id);
  return id;
});

const slice = createSlice({
  name: 'activities',
  initialState: { list: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (s) => { s.status = 'loading'; })
      .addCase(fetchActivities.fulfilled, (s, a) => { s.status = 'idle'; s.list = a.payload; })
      .addCase(addActivity.fulfilled, (s, a) => { s.list.push(a.payload); })
      .addCase(deleteActivity.fulfilled, (s, a) => { s.list = s.list.filter(x => x.id !== a.payload); });
  }
});
export default slice.reducer;