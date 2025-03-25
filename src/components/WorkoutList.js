import React, { useState } from 'react';
import './WorkoutList.css';

function WorkoutList({ workouts = [], setWorkouts, onClose }) {
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState(null);
  const [newExercise, setNewExercise] = useState({ name: '', reps: '', sets: '' });

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
    setEditedWorkout((prevWorkout) => {
      const updatedExercises = [...prevWorkout.exercises];
      updatedExercises[index] = {
        ...updatedExercises[index],
        [field]: value,
      };
      return { ...prevWorkout, exercises: updatedExercises };
    });
  };

  const saveEditedWorkout = () => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[currentWorkoutIndex] = editedWorkout;
    setWorkouts(updatedWorkouts);
    setEditMode(false);
  };

  const addNewExercise = () => {
    if (!newExercise.name || !newExercise.reps || !newExercise.sets) return;
    setEditedWorkout((prevWorkout) => ({
      ...prevWorkout,
      exercises: [...prevWorkout.exercises, newExercise],
    }));
    setNewExercise({ name: '', reps: '', sets: '' });
  };

  const createNewWorkout = () => {
    const newWorkout = {
      title: `Нова тренировка ${workouts.length + 1}`,
      exercises: []
    };
    setWorkouts([...workouts, newWorkout]);
    setCurrentWorkoutIndex(workouts.length);
  };

  const deleteWorkout = () => {
    const updatedWorkouts = workouts.filter(
      (_, index) => index !== currentWorkoutIndex
    );
    setWorkouts(updatedWorkouts);
    setCurrentWorkoutIndex(0);
    setEditMode(false);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="workout-modal">
        <button className="close-button" onClick={onClose}>X</button>
        {!editMode ? (
          <>
            <h2>{workouts[currentWorkoutIndex]?.title || "Тренировка"}</h2>
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
                {workouts[currentWorkoutIndex]?.exercises?.map((exercise, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{exercise.name || "Няма информация"}</td>
                    <td>{exercise.reps || "-"}</td>
                    <td>{exercise.sets || "-"}</td>
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
            <button className="save-button" onClick={saveEditedWorkout}>Запази</button>
            </div>

          </>
        ) : (
          <>
            <h2>Редакция на {editedWorkout?.title}</h2>
            <input
              type="text"
              value={editedWorkout?.title || ""}
              onChange={(e) => handleWorkoutChange("title", e.target.value)}
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
                {editedWorkout?.exercises?.map((exercise, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        value={exercise.name || ""}
                        onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={exercise.reps || ""}
                        onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={exercise.sets || ""}
                        onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <input type="text" placeholder="Упражнение" value={newExercise.name} onChange={(e) => setNewExercise({...newExercise, name: e.target.value})} />
            <input type="text" placeholder="Повт" value={newExercise.reps} onChange={(e) => setNewExercise({...newExercise, reps: e.target.value})} />
            <input type="text" placeholder="Серии" value={newExercise.sets} onChange={(e) => setNewExercise({...newExercise, sets: e.target.value})} />
            <button onClick={addNewExercise}>Добави</button>
            <button className="save-button" onClick={saveEditedWorkout}>Запази</button>
          </>
        )}
      </div>
    </>
  );
}

export default WorkoutList;
