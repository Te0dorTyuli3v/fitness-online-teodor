import React, { useState } from 'react';
import './WorkoutList.css';
import { supabase } from '../supabase';

function WorkoutList({ workouts = [], setWorkouts, onClose, user }) {
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState(null);
  const [newExercise, setNewExercise] = useState({ name: '', reps: '', sets: '' });
  const [successMessage, setSuccessMessage] = useState('');

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
    const workout = workouts[currentWorkoutIndex];
    setEditMode(true);
    setEditedWorkout({ ...workout, exercises: workout.exercises || [] });
  };

  const handleWorkoutChange = (field, value) => {
    setEditedWorkout((prev) => ({ ...prev, [field]: value }));
  };

  const handleExerciseChange = (index, field, value) => {
    const updated = [...editedWorkout.exercises];
    updated[index][field] = value;
    setEditedWorkout((prev) => ({ ...prev, exercises: updated }));
  };

  const addNewExercise = () => {
    if (!newExercise.name || !newExercise.reps || !newExercise.sets) return;
    setEditedWorkout((prev) => ({
      ...prev,
      exercises: [...(prev.exercises || []), newExercise],
    }));
    setNewExercise({ name: '', reps: '', sets: '' });
  };

  const saveEditedWorkout = async () => {
    if (!user || !editedWorkout) return;

    let workoutId = editedWorkout.id;

    if (!workoutId) {
      // Създай нова тренировка
      const { data: newWorkout, error } = await supabase
        .from('workouts')
        .insert([{ user_id: user.id, title: editedWorkout.title }])
        .select()
        .single();

      if (error) {
        console.error('Грешка при създаване:', error.message);
        return;
      }

      workoutId = newWorkout.id;
    } else {
      // Обнови съществуваща тренировка
      await supabase
        .from('workouts')
        .update({ title: editedWorkout.title })
        .eq('id', workoutId);

      await supabase.from('exercises').delete().eq('workout_id', workoutId);
    }

    // Добави новите упражнения
    const exercisesToSave = (editedWorkout.exercises || []).map((ex) => ({
      name: ex.name,
      reps: ex.reps,
      sets: ex.sets,
      workout_id: workoutId,
    }));

    if (exercisesToSave.length > 0) {
      await supabase.from('exercises').insert(exercisesToSave);
    }

    // Обнови локално
    const updatedWorkout = { ...editedWorkout, id: workoutId };
    const updated = [...workouts];
    updated[currentWorkoutIndex] = updatedWorkout;
    setWorkouts(updated);
    setEditMode(false);
    setSuccessMessage('Успешно запазено ✅');

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const deleteWorkout = async () => {
    const workout = workouts[currentWorkoutIndex];
    if (workout.id) {
      await supabase.from('exercises').delete().eq('workout_id', workout.id);
      await supabase.from('workouts').delete().eq('id', workout.id);
    }
    const updated = workouts.filter((_, i) => i !== currentWorkoutIndex);
    setWorkouts(updated);
    setCurrentWorkoutIndex(0);
    setEditMode(false);
  };

  const createNewWorkout = () => {
    const newWorkout = { title: `Нова тренировка ${workouts.length + 1}`, exercises: [] };
    setWorkouts((prev) => [...prev, newWorkout]);
    setCurrentWorkoutIndex(workouts.length);
    setEditMode(true);
    setEditedWorkout(newWorkout);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="workout-modal">
        <button className="close-button" onClick={onClose}>X</button>
        {successMessage && <div className="success-message">{successMessage}</div>}

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
                      <input
                        value={ex.name}
                        onChange={(e) => handleExerciseChange(i, 'name', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={ex.reps}
                        onChange={(e) => handleExerciseChange(i, 'reps', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={ex.sets}
                        onChange={(e) => handleExerciseChange(i, 'sets', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="new-exercise-inputs">
              <input
                placeholder="Упражнение"
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
              />
              <input
                placeholder="Повт"
                value={newExercise.reps}
                onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
              />
              <input
                placeholder="Серии"
                value={newExercise.sets}
                onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
              />
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
