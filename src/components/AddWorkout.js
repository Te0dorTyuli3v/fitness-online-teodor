import React, { useState } from 'react';

function AddWorkout({ onAddWorkout }) {
  const [workout, setWorkout] = useState({
    name: '',
    description: '',
    duration: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workout.name && workout.description && workout.duration) {
      onAddWorkout(workout);
      setWorkout({ name: '', description: '', duration: '' });
    } else {
      alert('Моля, попълнете всички полета.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Добави Нова Тренировка</h3>
      <input
        type="text"
        name="name"
        placeholder="Име на тренировката"
        value={workout.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Описание на тренировката"
        value={workout.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="duration"
        placeholder="Продължителност"
        value={workout.duration}
        onChange={handleChange}
      />
      <button type="submit">Добави Тренировка</button>
    </form>
  );
}

export default AddWorkout;
