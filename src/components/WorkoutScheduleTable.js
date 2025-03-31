import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

function WorkoutScheduleTable({ user }) {
  const [schedule, setSchedule] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newEntry, setNewEntry] = useState({ date: '', type: 'тренировъчен', note: '' });

  const fetchSchedule = async () => {
    const { data, error } = await supabase
      .from('daily_workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: true });

    if (error) console.error('Грешка при зареждане:', error.message);
    else setSchedule(data);
  };

  useEffect(() => {
    if (user) fetchSchedule();
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
      setNewEntry({ date: '', type: 'тренировъчен', note: '' });
      fetchSchedule();
    }
  };

  const updateEntry = async (index) => {
    const entry = schedule[index];
    const { error } = await supabase
      .from('daily_workouts')
      .update({ date: entry.date, type: entry.type, note: entry.note })
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
            <th>Бележка</th>
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
                  <>
                    <button onClick={() => updateEntry(index)}>Запази</button>
                    <button onClick={() => setEditingIndex(null)}>Откажи</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingIndex(index)}>Редактирай</button>
                    <button onClick={() => deleteEntry(entry.id)}>Изтрий</button>
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
              <button onClick={addEntry}>Добави</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutScheduleTable;
