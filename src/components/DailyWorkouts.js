import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

function DailyWorkouts({ planId }) {
  const [dailyWorkouts, setDailyWorkouts] = useState([]);

  useEffect(() => {
    const fetchDailyWorkouts = async () => {
      const { data, error } = await supabase
        .from('daily_workouts')
        .select('*, workouts(name, description)')
        .eq('plan_id', planId)
        .order('day_number', { ascending: true });
      if (error) console.log('Error fetching daily workouts:', error);
      else setDailyWorkouts(data);
    };

    fetchDailyWorkouts();
  }, [planId]);

  return (
    <div>
      <h3>Ежедневни тренировки</h3>
      <ul>
        {dailyWorkouts.map(workout => (
          <li key={workout.id}>
            <p>Ден {workout.day_number}: {workout.workouts.name}</p>
            <p>Описание: {workout.workouts.description}</p>
            <p>Повторения: {workout.repetitions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DailyWorkouts;
