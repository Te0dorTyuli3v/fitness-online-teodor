import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import './WorkoutScheduleTable.css';

function WorkoutScheduleTable({ user }) {
  const [schedule, setSchedule] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newEntry, setNewEntry] = useState({ date: '', type: 'тренировъчен', note: '', workout_id: '' });
  const [userWorkouts, setUserWorkouts] = useState([]);

  const fetchSchedule = async () => {
    const { data, error } = await supabase
      .from('daily_workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: true });

    if (error) console.error('Грешка при зареждане:', error.message);
    else setSchedule(data);
  };

  const fetchUserWorkouts = async () => {
    const { data, error } = await supabase
      .from('workouts')
      .select('id, title')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) console.error('Грешка при зареждане на тренировки:', error.message);
    else setUserWorkouts(data);
  };

  useEffect(() => {
    if (user) {
      fetchSchedule();
      fetchUserWorkouts();
    }
  }, [user]);

  const handleInputChange = (e, field, index = null) => {
    if (index === null) {
      setNewEntry({ ...newEntry, [field]: e.target.value });
    } else {
      const updated = [...schedule];
      updated[index][field] = e.target.value;
      setSchedule(updated);
    }
  };

  const addEntry = async () => {
    if (!newEntry.date) return;
    const { error } = await supabase.from('daily_workouts').insert([
      { ...newEntry, user_id: user.id },
    ]);
    if (error) console.error('Грешка при създаване:', error.message);
    else {
      setNewEntry({ date: '', type: 'тренировъчен', note: '', workout_id: '' });
      fetchSchedule();
    }
  };

  const updateEntry = async (index) => {
    const entry = schedule[index];
    const { error } = await supabase
      .from('daily_workouts')
      .update({ date: entry.date, type: entry.type, note: entry.note, workout_id: entry.workout_id })
      .eq('id', entry.id);

    if (error) console.error('Грешка при обновяване:', error.message);
    else {
      setEditingIndex(null);
      fetchSchedule();
    }
  };

  const deleteEntry = async (id) => {
    const { error } = await supabase.from('daily_workouts').delete().eq('id', id);
    if (error) console.error('Грешка при изтриване:', error.message);
    else fetchSchedule();
  };

  return (
    <div className="workout-table">
      <h2>Тренировъчен график</h2>

      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Тип</th>
            <th>Вид тренировка</th>
            <th>Свързана тренировка</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((entry, index) => (
            <tr key={entry.id}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="date"
                    value={entry.date}
                    onChange={(e) => handleInputChange(e, 'date', index)}
                  />
                ) : (
                  entry.date
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <select
                    value={entry.type}
                    onChange={(e) => handleInputChange(e, 'type', index)}
                  >
                    <option value="тренировъчен">тренировъчен</option>
                    <option value="почивен">почивен</option>
                  </select>
                ) : (
                  entry.type
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={entry.note}
                    onChange={(e) => handleInputChange(e, 'note', index)}
                  />
                ) : (
                  entry.note
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <select
                    value={entry.workout_id || ''}
                    onChange={(e) => handleInputChange(e, 'workout_id', index)}
                  >
                    <option value="">Няма</option>
                    {userWorkouts.map(w => (
                      <option key={w.id} value={w.id}>{w.title}</option>
                    ))}
                  </select>
                ) : (
                  userWorkouts.find(w => w.id === entry.workout_id)?.title || 'Няма'
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button onClick={() => updateEntry(index)}>Запази</button>
                    <button className="cancel-button" onClick={() => setEditingIndex(null)}>Откажи</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingIndex(index)}>Редактирай</button>
                    <button className="delete-button" onClick={() => deleteEntry(entry.id)}>Изтрий</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) => handleInputChange(e, 'date')}
              />
            </td>
            <td>
              <select
                value={newEntry.type}
                onChange={(e) => handleInputChange(e, 'type')}
              >
                <option value="тренировъчен">тренировъчен</option>
                <option value="почивен">почивен</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                value={newEntry.note}
                onChange={(e) => handleInputChange(e, 'note')}
              />
            </td>
            <td>
              <select
                value={newEntry.workout_id}
                onChange={(e) => handleInputChange(e, 'workout_id')}
              >
                <option value="">Няма</option>
                {userWorkouts.map(w => (
                  <option key={w.id} value={w.id}>{w.title}</option>
                ))}
              </select>
            </td>
            <td>
              <button className="add-button" onClick={addEntry}>Добави</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutScheduleTable;