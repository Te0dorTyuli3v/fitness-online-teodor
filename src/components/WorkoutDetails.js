import React from 'react';
import './WorkoutDetails.css';

function WorkoutDetails({ workout, onClose }) {
  return (
    <div className="workout-details-modal">
      <div className="workout-details-content">
        <h2>{workout.title}</h2>
        <table className="workout-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Упражнение</th>
              <th>Повт</th>
              <th>Серии</th>
            </tr>
          </thead>
          <tbody>
            {workout.exercises.map((exercise, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{exercise.name}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.sets}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="start-workout-button">Започни тренировка</button>
        <button className="close-button" onClick={onClose}>
          Затвори
        </button>
      </div>
    </div>
  );
}

export default WorkoutDetails;
