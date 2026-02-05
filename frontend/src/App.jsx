import React, { useEffect, useState } from 'react';
import api from './api/activitiesApi';
import ActivityForm from './components/ActivityForm';
import WeekView from './components/WeekView';
import { addDays, startOfWeek } from 'date-fns';
import { fetchActivities, addActivity, deleteActivity, selectActivitiesError, 
  selectAllActivities, selectActivitiesStatus } from './features/activities/activitiesSlice';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const activities = useSelector(selectAllActivities);
  const status = useSelector(selectActivitiesStatus);
  const error = useSelector(selectActivitiesError);
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchActivities());
    }
  }, [status, dispatch]);

  const handleAdd = async (payload) => {
    dispatch(addActivity(payload));
  };

  const handleDelete = async (id) => {
    dispatch(deleteActivity(id));
  };

  function prevWeek() { setWeekStart(ws => addDays(ws, -7)); }
  function nextWeek() { setWeekStart(ws => addDays(ws, 7)); }

  return (
    <div className="app">
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <div style={{ color: 'red' }}>Error: {error}</div>}

      <header><h1>Activity Tracker</h1></header>
      <main>
        <ActivityForm onAdd={handleAdd} status={status} />
        <WeekView weekStart={weekStart} activities={activities} onPrev={prevWeek} onNext={nextWeek} onDelete={handleDelete} />
      </main>
    </div>
  );
}