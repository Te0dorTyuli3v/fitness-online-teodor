import React, { useState } from 'react';
import './WorkoutList.css';
import { supabase } from '../supabase';

function WorkoutList({ workouts = [], setWorkouts, onClose, user }) {
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState(null);
  const [newExercise, setNewExercise] = useState({ name: '', reps: '', sets: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNextWorkout = () => {
    if (workouts.length > 0) {
      setCurrentWorkoutIndex((prevIndex) => (prevIndex + 1) % workouts.length);
    }
  };

  const handlePreviousWorkout = () => {
    if (workouts.length > 0) {
      setCurrentWorkoutIndex((prevIndex) =>
        prevIndex === 0 ? workouts.length - 1 : prevIndex - 1
      );
    }
  };

  const startEditWorkout = () => {
    setEditMode(true);
    setEditedWorkout({ ...workouts[currentWorkoutIndex] });
  };

  const handleWorkoutChange = (field, value) => {
    setEditedWorkout((prevWorkout) => ({
      ...prevWorkout,
      [field]: value,
    }));
  };

  const handleExerciseChange = (index, field, value) => {
    const updated = [...editedWorkout.exercises];
    updated[index][field] = value;
    setEditedWorkout((prev) => ({ ...prev, exercises: updated }));
  };

  const addNewExercise = () => {
    const { name, reps, sets } = newExercise;
    if (!name.trim() || !reps.trim() || !sets.trim()) {
      setErrorMessage('Моля, попълнете всички полета.');
      return;
    }
    if (isNaN(reps) || isNaN(sets)) {
      setErrorMessage('Повторенията и сериите трябва да са числа.');
      return;
    }

    const updatedExercises = [...(editedWorkout?.exercises || []), newExercise];

    setEditedWorkout((prev) => ({
      ...prev,
      exercises: updatedExercises,
    }));

    setNewExercise({ name: '', reps: '', sets: '' });
    setErrorMessage('');
  };

  const saveEditedWorkout = async () => {
    if (!editedWorkout || !user) return;
  
    let workoutId = editedWorkout.id;
    const isNew = !workoutId;
  
    // 🆕 Създай нова тренировка
    if (isNew) {
      const { data, error } = await supabase
        .from('workouts')
        .insert([{ title: editedWorkout.title, user_id: user.id }])
        .select()
        .single();
  
      if (error || !data) {
        console.error('Грешка при създаване на тренировка:', error?.message);
        return;
      }
  
      workoutId = data.id;
      editedWorkout.id = workoutId; // задаваме ID-то, за да вържем упражненията
    } else {
      // ✏️ Обнови заглавието и изтрий старите упражнения
      await supabase
        .from('workouts')
        .update({ title: editedWorkout.title })
        .eq('id', workoutId);
  
      await supabase.from('exercises').delete().eq('workout_id', workoutId);
    }
  
    // 💪 Добави упражнения
    const exercisesToInsert = (editedWorkout.exercises || []).map((ex) => ({
      workout_id: workoutId,
      name: ex.name,
      reps: ex.reps,
      sets: ex.sets,
    }));
  
    if (exercisesToInsert.length > 0) {
      const { error: insertErr } = await supabase.from('exercises').insert(exercisesToInsert);
      if (insertErr) {
        console.error('Грешка при запис на упражнения:', insertErr.message);
      }
    }
  
    const savedWorkout = { ...editedWorkout, id: workoutId };
  
    // 🔁 Обнови списъка
    let updatedWorkouts;

const existingIndex = workouts.findIndex((w) => w.id === workoutId);

if (existingIndex !== -1) {
  updatedWorkouts = [...workouts];
  updatedWorkouts[existingIndex] = savedWorkout;
} else {
  updatedWorkouts = [...workouts, savedWorkout];
}

  
    setWorkouts(updatedWorkouts);
    setCurrentWorkoutIndex(updatedWorkouts.length - 1);
    setEditMode(false);
    setSuccessMessage('Успешно запазено ✅');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  
  
  
  const createNewWorkout = () => {
    const newWorkout = {
      title: `Нова тренировка ${workouts.length + 1}`,
      exercises: [],
    };
    setEditedWorkout(newWorkout);
    setEditMode(true);
  };

  const deleteWorkout = async () => {
    const workout = workouts[currentWorkoutIndex];
  
    if (workout?.id) {
      await supabase.from('exercises').delete().eq('workout_id', workout.id);
      await supabase.from('workouts').delete().eq('id', workout.id);
    }
  
    const updated = workouts.filter((_, idx) => idx !== currentWorkoutIndex);
  
    setWorkouts(updated);
    setEditMode(false);
    setEditedWorkout(null);
  
    if (updated.length > 0) {
      setCurrentWorkoutIndex(0);
    } else {
      // Ако няма останали тренировки – затвори модала или не показвай нищо
      setCurrentWorkoutIndex(0);
    }
  };
  

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="workout-modal">
        <button className="close-button" onClick={onClose}>X</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {!editMode ? (
          <>
            <h2>{workouts[currentWorkoutIndex]?.title || 'Тренировка'}</h2>
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Упражнение</th>
                  <th>Повт</th>
                  <th>Серии</th>
                </tr>
              </thead>
              <tbody>
                {workouts[currentWorkoutIndex]?.exercises?.map((ex, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ex.name}</td>
                    <td>{ex.reps}</td>
                    <td>{ex.sets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="navigation-buttons">
              <button onClick={handlePreviousWorkout}>⬅ Предишна</button>
              <button onClick={handleNextWorkout}>Следваща ➡</button>
            </div>
            <div className="action-buttons">
              <button className="edit-button" onClick={startEditWorkout}>Редактирай</button>
              <button className="delete-button" onClick={deleteWorkout}>Изтрий</button>
              <button className="create-button" onClick={createNewWorkout}>Създай</button>
            </div>
          </>
        ) : (
          <>
            <h2>Редакция на {editedWorkout?.title}</h2>
            <input
              type="text"
              value={editedWorkout?.title || ''}
              onChange={(e) => handleWorkoutChange('title', e.target.value)}
              placeholder="Име на тренировката"
            />
            <table>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Упражнение</th>
                  <th>Повт</th>
                  <th>Серии</th>
                </tr>
              </thead>
              <tbody>
                {editedWorkout?.exercises?.map((ex, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <input value={ex.name} onChange={(e) => handleExerciseChange(i, 'name', e.target.value)} />
                    </td>
                    <td>
                      <input value={ex.reps} onChange={(e) => handleExerciseChange(i, 'reps', e.target.value)} />
                    </td>
                    <td>
                      <input value={ex.sets} onChange={(e) => handleExerciseChange(i, 'sets', e.target.value)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="new-exercise-inputs">
              <input placeholder="Упражнение" value={newExercise.name} onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })} />
              <input placeholder="Повт" value={newExercise.reps} onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })} />
              <input placeholder="Серии" value={newExercise.sets} onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })} />
              <button onClick={addNewExercise}>Добави</button>
            </div>
            <button className="save-button" onClick={saveEditedWorkout}>Запази</button>
          </>
        )}
      </div>
    </>
  );
}

export default WorkoutList;
