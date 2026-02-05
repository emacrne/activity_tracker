import React from 'react';
import { startOfWeek, addDays, format, parseISO } from 'date-fns';
import ActivityItem from './ActivityItem';
import styles from './styles/WeekView.module.css';

function getWeekDays(baseDate) {
  const start = startOfWeek(baseDate, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

function activitiesForDay(activities, dateObj) {
  const dayStr = format(dateObj, 'yyyy-MM-dd');
  return activities.filter(a => {
    if (!a.date) return false;
    try {
      return format(parseISO(a.date), 'yyyy-MM-dd') === dayStr;
    } catch {
      return a.date === dayStr;
    }
  });
}

export default function WeekView({ weekStart, activities = [], onPrev, onNext, onDelete }) {
  const days = getWeekDays(weekStart);
  return (
    <section className={styles.listCard}>
      <div className={styles.weekHeader}>
        <button onClick={onPrev}>&lt;</button>
        <div className={styles.weekTitle}>
          {format(weekStart, 'MMM d')} — {format(addDays(weekStart, 6), 'MMM d, yyyy')}
        </div>
        <button onClick={onNext}>&gt;</button>
      </div>

      <div className={styles.weekGrid}>
        {days.map(d => {
          const items = activitiesForDay(activities, d);
          return (
            <div key={d.toISOString()} className={styles.dayColumn}>
              <div className={styles.dayTitle}>{format(d, 'EEE d')}</div>
              <ul className={styles.dayColumnList}>
                {items.length === 0 ? <li className={styles.empty}>No activities</li> :
                  items.map(a => <ActivityItem key={a.id} activity={a} onDelete={onDelete} />)
                }
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}