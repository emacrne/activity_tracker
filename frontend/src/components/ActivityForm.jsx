import React, { useState } from 'react';
import styles from './styles/ActivityForm.module.css';

export default function ActivityForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', description: '', date: '', durationHours: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.name || !form.date || !form.durationHours) {
      setError('Name, date and duration are required.');
      return;
    }
    // normalize to nearest 0.5 hour step
    const raw = Number(form.durationHours);
    const dur = Math.round(raw * 2) / 2;
    if (isNaN(dur) || dur < 0.5) {
      setError('Duration must be at least 0.5 hours');
      return;
    }
    const payload = { ...form, durationHours: dur };
    await onAdd(payload);
    setForm({ name: '', description: '', date: '', durationHours: '' });
  }

  return (
    <section className={styles.formCard}>
      <h2>Add activity</h2>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>Name
          <input className={styles.input} name="name" value={form.name} onChange={handleChange} />
        </label>

        <label className={styles.label}>Date
          <input className={styles.input} name="date" type="date" value={form.date} onChange={handleChange} />
        </label>

        <label className={styles.label}>Duration (hours)
          <input className={styles.input} name="durationHours" type="number" min="0.5" step="0.5" value={form.durationHours} onChange={handleChange} />
        </label>

        <label className={styles.label}>Description
          <textarea className={styles.textarea} name="description" value={form.description} onChange={handleChange} />
        </label>

        <div className={styles.formActions}><button type="submit">Add</button></div>
      </form>
    </section>
  );
}