import React, { useState } from 'react';
import './WorkoutList.css';

function WorkoutList({ workouts = [], setWorkouts, onClose, onReplaceWorkout }) {
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState(null);
  
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
  
  const replaceWorkout = (index, updatedWorkout) => {
    setWorkouts((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts];
      updatedWorkouts[index] = updatedWorkout; // Заместване на тренировката
      return updatedWorkouts;
    });
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
    setWorkouts(updatedWorkouts); // Използваме setWorkouts за актуализация
    setEditMode(false);
  };
  

  if (!workouts || workouts.length === 0) {
    return (
      <>
        <div className="modal-backdrop" onClick={onClose}></div>
        <div className="workout-modal">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Няма налични тренировки</h2>
        </div>
      </>
    );
  }

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
            <button className="edit-button" onClick={startEditWorkout}>
              Редактирай
            </button>
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
            <button className="save-button" onClick={saveEditedWorkout}>
                  Запази
            </button>

          </>
        )}
      </div>
    </>
  );
}

export default WorkoutList;
