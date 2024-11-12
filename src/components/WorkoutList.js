import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data, error } = await supabase
        .from('workouts')
        .select('*');
      if (error) console.log('Error fetching workouts:', error);
      else setWorkouts(data);
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h3>Твоите Тренировки</h3>
      {workouts.length > 0 ? (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <h4>{workout.name}</h4>
                <p>{workout.description}</p>
                <p>Продължителност: {workout.duration}</p>
              </div>
              {workout.image_url && (
                <img
                  src={workout.image_url}
                  alt={workout.name}
                  style={{ width: '150px', height: '100px', marginLeft: '15px', borderRadius: '8px' }}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Все още няма добавени тренировки.</p>
      )}
    </div>
  );
}

export default WorkoutList;
