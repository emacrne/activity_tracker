import { configureStore } from '@reduxjs/toolkit';
import activitiesReducer from './features/activities/activitiesSlice';

const store = configureStore({
  reducer: { activities: activitiesReducer } 
});

if (import.meta.env.DEV) {
  window.store = store;
}

export default store;