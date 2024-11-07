import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function WorkoutList() {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Лицеви опори", description: "20 лицеви опори", duration: "5 мин" },
    { id: 2, name: "Бягане", description: "10 минути бягане", duration: "10 мин" },
    { id: 3, name: "Клякания", description: "15 клякания", duration: "5 мин" },
  { id: 4, name: "Планк", description: "Задръжка на планк за 1 минута", duration: "1 мин" }
  ]);

  return (
    <div>
      <h3>Твоите Тренировки</h3>
      {workouts.length > 0 ? (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <h4>{workout.name}</h4>
              <p>{workout.description}</p>
              <p>Продължителност: {workout.duration}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Все още няма добавени тренировки. <Link to="/add">Добави нова тренировка</Link>.</p>
      )}
    </div>
  );
}

export default WorkoutList;
