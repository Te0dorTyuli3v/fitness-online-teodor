import React from 'react';
import Calendar from 'react-calendar'; // Уверете се, че сте инсталирали react-calendar: npm install react-calendar
import 'react-calendar/dist/Calendar.css';
import './WorkoutSchedule.css'; // Създайте стилове за компонента



function WorkoutSchedule() {
  const workouts = [
    { date: new Date(2025, 0, 2), type: 'Тренировъчен ден' },
    { date: new Date(2025, 0, 4), type: 'Почивен ден' },
    { date: new Date(2025, 0, 6), type: 'Тренировъчен ден' },
    { date: new Date(2025, 0, 8), type: 'Почивен ден' },
    { date: new Date(2025, 0, 10), type: 'Тренировъчен ден' },
    { date: new Date(2025, 0, 12), type: 'Почивен ден' },
  ];

  // Форматиране на дните в календара
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const workout = workouts.find(
        (workout) => workout.date.toDateString() === date.toDateString()
      );
      if (workout) {
        return workout.type === 'Тренировъчен ден' ? 'training-day' : 'rest-day';
      }
    }
    return null;
  };

  return (
    <div className="workout-schedule-container">
      <h2>Календар</h2>
      <Calendar tileClassName={tileClassName} />

      <div className="workout-graph">
        <h2>Тренировъчен график</h2>
        <ul>
          {workouts.map((workout, index) => (
            <li key={index} className={workout.type === 'Тренировъчен ден' ? 'training-day' : 'rest-day'}>
              {index + 1}. {workout.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkoutSchedule;
