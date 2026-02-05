import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/activitiesApi';

export const fetchActivities = createAsyncThunk('activities/fetch', async () => {
  const res = await api.get('');
  return res.data;
});
export const addActivity = createAsyncThunk('activities/add', async (payload) => {
  const res = await api.post('', payload);
  return res.data;
});
export const deleteActivity = createAsyncThunk('activities/delete', async (id) => {
  await api.delete(`/${id}`);
  return id;
});

const slice = createSlice({
  name: 'activities',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addActivity.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(deleteActivity.fulfilled, (state, action) => { state.items = state.items.filter(i => i.id !== action.payload); });
  }
});
export default slice.reducer;