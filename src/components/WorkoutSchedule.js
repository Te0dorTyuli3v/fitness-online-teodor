import React from 'react';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css';
import './WorkoutSchedule.css';

function WorkoutSchedule({ onClose }) {
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);


useEffect(() => {
  const fetchWorkouts = async () => {
    const { data, error } = await supabase
      .from('daily_workouts')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Грешка при зареждане на тренировъчния график:', error.message);
    } else {
      setWorkouts(data);
    }
  };

  fetchWorkouts();
}, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0]; // Преобразуване към YYYY-MM-DD
      const workout = workouts.find((w) => w.date === formattedDate);
  
      if (workout) {
        return workout.type === 'тренировъчен' ? 'training-day' : 'rest-day';
      }
    }
    return null;
  };
  
  return (
    <div className="workout-schedule-container">
      <button className="calendar-close-button" onClick={onClose}>X</button>
      <h2>Календар</h2>
      <div className="calendar-and-graph">
        <div className="calendar-section">
        {selectedDate && (
  <div className="selected-workout-info">
    <h3>Информация за {selectedDate}:</h3>
    {selectedWorkout ? (
      <>
        <p><strong>Тип:</strong> {selectedWorkout.type}</p>
        <p><strong>Бележка:</strong> {selectedWorkout.note || 'няма бележка'}</p>
      </>
    ) : (
      <p>Няма въведена тренировка за тази дата.</p>
    )}
  </div>
)}

        <Calendar
         tileClassName={tileClassName}
         onClickDay={(value) => {
    const clickedDate = value.toISOString().split('T')[0];
    const workout = workouts.find((w) => w.date === clickedDate);
          setSelectedDate(clickedDate);
          setSelectedWorkout(workout || null);
         }}
         />

        </div>
      </div>
    </div>
  );
}

export default WorkoutSchedule;


