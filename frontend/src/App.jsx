import { useEffect, useState } from 'react';
import api from './api/activitiesApi';

export default function App() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0,10), type:'', description:'', durationMinutes:0 });

  useEffect(() => { api.getAll().then(r => setList(r.data)); }, []);

  const add = async () => {
    try {
      console.log('sending', form);
      const res = await api.create(form);
      console.log('created', res);
      setList(s => [...s, res.data]);
    } catch (err) {
      console.error('create failed', err);
      alert('Create failed — see console');
    }
  };

  const remove = async (id) => {
    await api.remove(id);
    setList(s => s.filter(x => x.id !== id));
  };

  return (
    <div style={{padding:20}}>
      <h1>Activities</h1>
      <ul>{list.map(a => <li key={a.id}>{a.date} — {a.type} ({a.durationMinutes}m) <button onClick={()=>remove(a.id)}>Delete</button></li>)}</ul>
      <div style={{marginTop:20}}>
        <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
        <input placeholder="type" value={form.type} onChange={e=>setForm({...form,type:e.target.value})} />
        <input type="number" placeholder="minutes" value={form.durationMinutes} onChange={e=>setForm({...form,durationMinutes: +e.target.value})} />
        <input placeholder="description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <button onClick={add}>Add</button>
      </div>
    </div>
  );
}