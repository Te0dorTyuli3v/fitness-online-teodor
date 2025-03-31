import React from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';
import './WorkoutSchedule.css';

function WorkoutSchedule() {
  const generateWorkouts = () => {
    const workouts = [];
    const startDate = new Date(2025, 0, 1);
    const totalDays = 31;
    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      workouts.push({
        date: currentDate,
        type: i % 2 === 0 ? 'Тренировъчен ден' : 'Почивен ден',
      });
    }
    return workouts;
  };

  const workouts = generateWorkouts();

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
  
      <div className="calendar-and-graph">
        <div className="calendar-section">
          <Calendar tileClassName={tileClassName} />
        </div>
  
        <div className="workout-graph scrollable-graph">
          <h2>Календар</h2>
          <ul>
            {workouts.map((workout, index) => (
              <li
                key={index}
                className={workout.type === 'Тренировъчен ден' ? 'training-day' : 'rest-day'}
              >
                {index + 1}. {workout.type} - {workout.date.toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
}

export default WorkoutSchedule;

