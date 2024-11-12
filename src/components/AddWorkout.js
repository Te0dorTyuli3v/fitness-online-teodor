import React, { useState } from 'react';
import { supabase } from '../supabase';

function AddWorkout() {
  const [workout, setWorkout] = useState({
    name: '',
    description: '',
    duration: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('workouts')
      .insert([workout]);
    if (error) console.log('Error adding workout:', error);
    else alert('Тренировката е добавена успешно!');
    setWorkout({ name: '', description: '', duration: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Добави Нова Тренировка</h3>
      <input
        type="text"
        name="name"
        placeholder="Име на тренировката"
        value={workout.name}
        onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
      />
      <input
        type="text"
        name="description"
        placeholder="Описание на тренировката"
        value={workout.description}
        onChange={(e) => setWorkout({ ...workout, description: e.target.value })}
      />
      <input
        type="text"
        name="duration"
        placeholder="Продължителност"
        value={workout.duration}
        onChange={(e) => setWorkout({ ...workout, duration: e.target.value })}
      />
      <button type="submit">Добави Тренировка</button>
    </form>
  );
}

export default AddWorkout;
