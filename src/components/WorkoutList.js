import React from 'react';
import './WorkoutList.css'; // Увери се, че добавяш стилизиращ файл

const WorkoutList = ({ workouts, onClose }) => {
  return (
    <div className="workout-list-overlay">
      <div className="workout-list-container">
        <button className="workout-list-close" onClick={onClose}>
          &times;
        </button>
        <h3 className="workout-list-title">Тренировка 1</h3>
        <table className="workout-list-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Упражнение</th>
              <th>Повт</th>
              <th>Серии</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{workout.name}</td>
                <td>{workout.reps}</td>
                <td>{workout.sets}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="start-workout-button">Започни тренировка</button>
      </div>
    </div>
  );
};

export default WorkoutList;
