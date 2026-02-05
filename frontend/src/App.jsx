import React, { useEffect, useState } from 'react';
import api from './api/activitiesApi';
import ActivityForm from './components/ActivityForm';
import WeekView from './components/WeekView';
import { addDays, startOfWeek } from 'date-fns';
import './App.css';

export default function App() {
  const [activities, setActivities] = useState([]);
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [loading, setLoading] = useState(false);

  async function fetchAll() {
    setLoading(true);
    try {
      const res = await api.get('');
      setActivities(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAll(); }, []);

  async function handleAdd(payload) {
    await api.post('', payload);
    await fetchAll();
  }

  async function handleDelete(id) {
    await api.delete(`/${id}`);
    await fetchAll();
  }

  function prevWeek() { setWeekStart(ws => addDays(ws, -7)); }
  function nextWeek() { setWeekStart(ws => addDays(ws, 7)); }

  return (
    <div className="app">
      <header><h1>Activity Tracker</h1></header>
      <main>
        <ActivityForm onAdd={handleAdd} />
        <WeekView weekStart={weekStart} activities={activities} onPrev={prevWeek} onNext={nextWeek} onDelete={handleDelete} />
      </main>
    </div>
  );
}