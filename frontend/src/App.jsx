import { useEffect, useState } from 'react';
import ActivityForm from './components/ActivityForm';
import WeekView from './components/WeekView';
import UpdateActivityForm from './components/UpdateActivityForm';
import { addDays, startOfWeek } from 'date-fns';
import { fetchActivities, addActivity, deleteActivity, editActivity, selectActivitiesError, 
  selectAllActivities, selectActivitiesStatus } from './features/activities/activitiesSlice';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const activities = useSelector(selectAllActivities);
  const status = useSelector(selectActivitiesStatus);
  const error = useSelector(selectActivitiesError);
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [editingActivity, setEditingActivity] = useState(null);
  
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

  const handleEdit = (activity) => {
    setEditingActivity(activity);
  };

  const handleUpdate = async (id, updates) => {
    await dispatch(editActivity({ id, updates }));
    setEditingActivity(null);
  };

  const handleCancelEdit = () => {
    setEditingActivity(null);
  };

  function prevWeek() { setWeekStart(ws => addDays(ws, -7)); }
  function nextWeek() { setWeekStart(ws => addDays(ws, 7)); }

  return (
    <div className="app">
      {status === 'loading' && !editingActivity && <p>Loading...</p>}
      {status === 'failed' && <div style={{ color: 'red' }}>Error: {error}</div>}

      <header><h1>Activity Log</h1></header>
      <main>
        <ActivityForm onAdd={handleAdd} status={status} />
        <WeekView weekStart={weekStart} activities={activities} onPrev={prevWeek} onNext={nextWeek} onDelete={handleDelete} onEdit={handleEdit} />
      </main>

      {editingActivity && (
        <div className="modalOverlay">
          <UpdateActivityForm activity={editingActivity} onUpdate={handleUpdate} onCancel={handleCancelEdit} status={status} />
        </div>
      )}
    </div>
  );
}