import React from 'react';
import './WorkoutDetails.css';

function WorkoutDetails({ onClose }) {
  const workouts = [
    { id: 1, name: 'Клек', reps: '3-5', sets: 4 },
    { id: 2, name: 'Лежанка', reps: '4-6', sets: 4 },
    { id: 3, name: 'Вертикален скрипец', reps: '6-8', sets: 4 },
    { id: 4, name: 'Странично рамо с дъмбели', reps: '10-12', sets: 3 },
    { id: 5, name: 'Cable Triceps Pushdown', reps: '12-15', sets: 3 },
    { id: 6, name: 'Трапец с лост', reps: '10-12', sets: 3 },
  ];

  return (
    <div className="workout-details-modal">
      <div className="workout-details-content">
        <h2>Тренировка 1</h2>
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
            {workouts.map((workout) => (
              <tr key={workout.id}>
                <td>{workout.id}</td>
                <td>{workout.name}</td>
                <td>{workout.reps}</td>
                <td>{workout.sets}</td>
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
