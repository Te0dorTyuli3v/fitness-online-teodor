import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './WorkoutSchedule.css';

function WorkoutSchedule({ onClose }) {
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [user, setUser] = useState(null);

  // Вземи логнатия потребител
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Грешка при взимане на потребителя:', error.message);
      } else {
        setUser(data?.user || null);
      }
    };

    fetchUser();
  }, []);

  // Зареди само неговите тренировки
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('daily_workouts')
        .select('*')
        .eq('user_id', user.id) // 🔒 Само неговите
        .order('date', { ascending: true });

      if (error) {
        console.error('Грешка при зареждане на графика:', error.message);
      } else {
        setWorkouts(data);
      }
    };

    fetchWorkouts();
  }, [user]);

  const formatLocalDate = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split('T')[0];
  };
  
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = formatLocalDate(date); // използвай функцията тук
      const workout = workouts.find((w) => w.date === formattedDate);
  
      if (workout) {
        return workout.type === 'тренировъчен' ? 'training-day' : 'rest-day';
      }
    }
    return null;
  };
  
  
  // Обработка при избор на ден
  const handleDayClick = (value) => {
    const clickedDate = formatLocalDate(value);
    const workout = workouts.find((w) => w.date === clickedDate);
    setSelectedDate(clickedDate);
    setSelectedWorkout(workout || null);
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
    const clickedDate = formatLocalDate(value); // използвай функцията тук
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


