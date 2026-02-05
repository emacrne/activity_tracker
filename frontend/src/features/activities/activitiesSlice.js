import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/activitiesApi';

export const fetchActivities = createAsyncThunk('activities/fetch', async () => {
  const res = await api.get('');
  return res.data;
});
export const addActivity = createAsyncThunk(
  'activities/add',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post('', payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to add activity');
    }
  }
);
export const deleteActivity = createAsyncThunk('activities/delete', async (id) => {
  await api.delete(`/${id}`);
  return id;
});
export const editActivity = createAsyncThunk('activities/edit', async ({ id, updates }) => {
  const res = await api.put(`/${id}`, updates);
  return res.data;
});

const slice = createSlice({
  name: 'activities',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchActivities.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchActivities.fulfilled, (state, action) => { state.items = action.payload; state.status = 'succeeded'; })
      .addCase(fetchActivities.rejected, (state, action) => { state.status = 'failed'; state.error = action.error ? action.error.message : 'Failed to fetch activities'; })
      // add
      .addCase(addActivity.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(addActivity.fulfilled, (state, action) => { state.items.push(action.payload); state.status = 'succeeded'; })
      .addCase(addActivity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Failed to add activity';
      })
      // delete
      .addCase(deleteActivity.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(deleteActivity.fulfilled, (state, action) => { state.items = state.items.filter(i => i.id !== action.payload); state.status = 'succeeded'; })
      .addCase(deleteActivity.rejected, (state, action) => { state.status = 'failed'; state.error = action.error ? action.error.message : 'Failed to delete activity'; })
      // edit
      .addCase(editActivity.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(editActivity.fulfilled, (state, action) => { const idx = state.items.findIndex(i => i.id === action.payload.id); if (idx >= 0) state.items[idx] = action.payload; state.status = 'succeeded'; })
      .addCase(editActivity.rejected, (state, action) => { state.status = 'failed'; state.error = action.error ? action.error.message : 'Failed to update activity'; });
  }
});
// selectors
export const selectAllActivities = state => state.activities.items;
export const selectActivitiesStatus = state => state.activities.status;
export const selectActivitiesError = state => state.activities.error;

export default slice.reducer;