import React, { useState } from 'react';
import './WorkoutList.css';

function WorkoutList({ workouts = [], onClose }) {
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);

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

  // Ако няма тренировки, показваме fallback съобщение
  if (!workouts || workouts.length === 0) {
    return (
      <>
        <div className="modal-backdrop" onClick={onClose}></div>
        <div className="workout-modal">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Няма налични тренировки</h2>
          <button className="start-button" onClick={onClose}>
            Затвори
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Фонова маска */}
      <div className="modal-backdrop" onClick={onClose}></div>

      {/* Прозорец за тренировките */}
      <div className="workout-modal">
        <button className="close-button" onClick={onClose}>X</button>
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
        <button className="start-button" onClick={onClose}>
          Добави тренировка
        </button>
      </div>
    </>
  );
}

export default WorkoutList;
