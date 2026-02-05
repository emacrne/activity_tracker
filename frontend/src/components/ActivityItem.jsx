import React from 'react';
import styles from './styles/ActivityItem.module.css';

export default React.memo(function ActivityItem({ activity, onDelete }) {
  const hoursText = (() => {
    const raw = activity.durationHours ?? (activity.durationMinutes ? activity.durationMinutes / 60 : null);
    if (raw === null || raw === undefined) return '';
    const n = Number(raw);
    if (Number.isNaN(n)) return '';
    const fmt = String(+n.toFixed(2));
    return `${fmt} h`;
  })();

  return (
    <li className={styles.activity}>
      <div className={styles.title}>{activity.name}</div>
      <div className={styles.duration}>{hoursText}</div>
      

      {activity.description && <div className={styles.desc}>{activity.description}</div>}

      <div className={styles.actions}>
        <button className={styles.delete} aria-label="Delete activity" onClick={() => onDelete(activity.id)}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </li>
  );
});