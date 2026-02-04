import { configureStore } from '@reduxjs/toolkit';
import activitiesReducer from './features/activities/activitiesSlice';
export default configureStore({ reducer: { activities: activitiesReducer } });