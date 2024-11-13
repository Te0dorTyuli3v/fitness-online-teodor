import React, { useState } from 'react';
import { supabase } from '../supabase';

function AddWorkout() {
  const [workout, setWorkout] = useState({
    name: '',
    description: '',
    duration: ''
  });

  // Състояние за tooltip съобщението
  const [tooltip, setTooltip] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('workouts')
      .insert([workout]);
    if (error) {
      console.log('Error adding workout:', error);
    } else {
      alert('Тренировката е добавена успешно!');
      setWorkout({ name: '', description: '', duration: '' });
    }
  };

  // Показване на tooltip съобщението при фокус
  const handleFocus = (field) => {
    switch (field) {
      case 'name':
        setTooltip('Въведи името на тренировката, напр. "Лицеви опори".');
        break;
      case 'description':
        setTooltip('Въведи кратко описание на тренировката.');
        break;
      case 'duration':
        setTooltip('Въведи продължителността, напр. "5 минути".');
        break;
      default:
        setTooltip('');
    }
  };

  // Скриване на tooltip съобщението при загуба на фокус
  const handleBlur = () => {
    setTooltip('');
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
        onFocus={() => handleFocus('name')}
        onBlur={handleBlur}
      />
      <input
        type="text"
        name="description"
        placeholder="Описание на тренировката"
        value={workout.description}
        onChange={(e) => setWorkout({ ...workout, description: e.target.value })}
        onFocus={() => handleFocus('description')}
        onBlur={handleBlur}
      />
      <input
        type="text"
        name="duration"
        placeholder="Продължителност"
        value={workout.duration}
        onChange={(e) => setWorkout({ ...workout, duration: e.target.value })}
        onFocus={() => handleFocus('duration')}
        onBlur={handleBlur}
      />
      <button type="submit">Добави Тренировка</button>
      {/* Показване на tooltip съобщението */}
      {tooltip && <div className="tooltip">{tooltip}</div>}
    </form>
  );
}

export default AddWorkout;
