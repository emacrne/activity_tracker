import axios from 'axios';

const api = axios.create({ baseURL: '/api/activities' });

export const selectAllActivities = state => state.activities.items;
export const selectActivitiesStatus = state => state.activities.status;
export const selectActivitiesError = state => state.activities.error;

export default api;