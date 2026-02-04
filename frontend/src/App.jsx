import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActivities, addActivity, deleteActivity } from './features/activities/activitiesSlice';

export default function App() {
  const dispatch = useDispatch();
  const list = useSelector(state => state.activities.list);
  const [form,setForm] = useState({ date: new Date().toISOString().slice(0,10), type:'', description:'', durationMinutes:0 });

  useEffect(()=> { dispatch(fetchActivities()); }, [dispatch]);

  const handleAdd = () => {
    dispatch(addActivity(form));
    setForm({...form, type:'', description:'', durationMinutes:0});
  };
  const handleDelete = (id) => dispatch(deleteActivity(id));

  return (
    <div>
      <h1>Activities</h1>
      <ul>{list.map(a => <li key={a.id}>{a.date} — {a.type} <button onClick={()=>handleDelete(a.id)}>Delete</button></li>)}</ul>
      <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/>
      <input value={form.type} onChange={e=>setForm({...form,type:e.target.value})} placeholder="type" />
      <input type="number" value={form.durationMinutes} onChange={e=>setForm({...form,durationMinutes:+e.target.value})} />
      <input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="desc" />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}