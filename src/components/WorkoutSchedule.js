import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabase';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './WorkoutSchedule.css';

function WorkoutSchedule({ onClose, refreshTrigger }) {
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
      if (error) console.error('Грешка при взимане на потребителя:', error.message);
    };
    fetchUser();
  }, []);

  const fetchWorkouts = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('daily_workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: true });

    if (error) {
      console.error('Грешка при зареждане на графика:', error.message);
    } else {
      setWorkouts(data.filter((w) => w.date));
    }
  }, [user]);

  const fetchExercises = async (workoutId) => {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('workout_id', workoutId);
    if (!error) setSelectedExercises(data);
    else setSelectedExercises([]);
  };

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts, refreshTrigger]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const formattedDate = localDate.toISOString().split('T')[0];
      const workout = workouts.find((w) => w.date === formattedDate);
      if (workout) {
        return workout.type === 'тренировъчен' ? 'training-day' : 'rest-day';
      }
    }
    return null;
  };

  return (
    <div className="workout-schedule-container">
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
                  {selectedExercises.length > 0 ? (
                    <>
                      <p><strong>Упражнения:</strong></p>
                      <ul>
                        {selectedExercises.map((ex) => (
                          <li key={ex.id}>
                            {ex.name} – {ex.reps} повт. / {ex.sets} серии
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p>Няма упражнения за тази тренировка.</p>
                  )}
                </>
              ) : (
                <p>Няма въведена тренировка за тази дата.</p>
              )}
            </div>
          )}
          <Calendar
            tileClassName={tileClassName}
            onClickDay={(value) => {
              const localValue = new Date(value.getTime() - value.getTimezoneOffset() * 60000);
              const clickedDate = localValue.toISOString().split('T')[0];
              const workout = workouts.find((w) => w.date === clickedDate);
              setSelectedDate(clickedDate);
              setSelectedWorkout(workout || null);
              if (workout?.workout_id) {
                fetchExercises(workout.workout_id);
              } else {
                setSelectedExercises([]);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default WorkoutSchedule;