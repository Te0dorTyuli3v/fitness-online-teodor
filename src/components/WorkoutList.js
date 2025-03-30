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
    if (!newExercise.name || !newExercise.reps || !newExercise.sets) return;
    setEditedWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }));
    setNewExercise({ name: '', reps: '', sets: '' });
  };

  const saveEditedWorkout = async () => {
    if (!editedWorkout || !user) return;

    let workoutId = editedWorkout.id;

    // Ако е нова тренировка - създай я в Supabase
    if (!workoutId) {
      const { data, error } = await supabase
        .from('workouts')
        .insert([{ title: editedWorkout.title, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Грешка при създаване на тренировка:', error.message);
        return;
      }

      workoutId = data.id;
    } else {
      // Обнови заглавието в Supabase
      await supabase
        .from('workouts')
        .update({ title: editedWorkout.title })
        .eq('id', workoutId);

      // Изтрий старите упражнения
      await supabase.from('exercises').delete().eq('workout_id', workoutId);
    }

    // Вмъкни новите упражнения
    const exercisesToInsert = editedWorkout.exercises.map((ex) => ({
      workout_id: workoutId,
      name: ex.name,
      reps: ex.reps,
      sets: ex.sets,
    }));

    if (exercisesToInsert.length > 0) {
      await supabase.from('exercises').insert(exercisesToInsert);
    }

    const savedWorkout = { ...editedWorkout, id: workoutId };

    const updatedWorkouts = [...workouts];
    if (editedWorkout.id) {
      // съществуваща тренировка
      updatedWorkouts[currentWorkoutIndex] = savedWorkout;
    } else {
      // нова тренировка
      updatedWorkouts.push(savedWorkout);
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
    if (workout.id) {
      await supabase.from('exercises').delete().eq('workout_id', workout.id);
      await supabase.from('workouts').delete().eq('id', workout.id);
    }

    const updated = workouts.filter((_, idx) => idx !== currentWorkoutIndex);
    setWorkouts(updated);
    setCurrentWorkoutIndex(0);
    setEditMode(false);
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


