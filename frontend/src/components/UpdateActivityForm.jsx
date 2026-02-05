import React, { useState } from 'react';
import styles from './styles/UpdateActivityForm.module.css';

export default function UpdateActivityForm({ activity, onUpdate, onCancel, status = 'idle' }) {
  const [form, setForm] = useState({
    name: activity.name || '',
    description: activity.description || '',
    date: activity.date || '',
    durationHours: activity.durationHours || ''
  });
  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    // Build only the fields that changed
    const updates = {};
    if (form.name !== activity.name) updates.name = form.name;
    if (form.description !== activity.description) updates.description = form.description;
    if (form.date !== activity.date) updates.date = form.date;
    if (form.durationHours !== activity.durationHours) updates.durationHours = Number(form.durationHours);

    if (Object.keys(updates).length === 0) {
      setError('No changes made');
      return;
    }

    // Validate required fields if changed
    if (updates.name !== undefined && !updates.name) {
      setError('Name cannot be empty');
      return;
    }
    if (updates.date !== undefined && !updates.date) {
      setError('Date cannot be empty');
      return;
    }
    if (updates.durationHours !== undefined && (isNaN(updates.durationHours) || updates.durationHours <= 0)) {
      setError('Duration must be a positive number');
      return;
    }

    await onUpdate(activity.id, updates);
  }

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <h2 className={styles.title}>Update Activity</h2>
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span style={{ fontWeight: 500, marginBottom: '6px' }}>Name</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} className={styles.input} />
          </label>

          <label className={styles.field}>
            <span style={{ fontWeight: 500, marginBottom: '6px' }}>Date</span>
            <input type="date" name="date" value={form.date} onChange={handleChange} className={styles.input} />
          </label>

          <label className={styles.field}>
            <span style={{ fontWeight: 500, marginBottom: '6px' }}>Duration (hours)</span>
            <input type="number" name="durationHours" min="0" step="any" value={form.durationHours} onChange={handleChange} className={styles.input} />
          </label>

          <label className={styles.field}>
            <span style={{ fontWeight: 500, marginBottom: '6px' }}>Description</span>
            <textarea name="description" value={form.description} onChange={handleChange} className={styles.textarea} />
          </label>

          <div className={styles.actions}>
            <button type="button" onClick={onCancel} className={styles.btnCancel}>
              Cancel
            </button>
            <button type="submit" disabled={status === 'loading'} className={styles.btnUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
