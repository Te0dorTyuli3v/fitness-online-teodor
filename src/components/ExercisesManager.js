import React, { useEffect, useState, useCallback } from 'react';
import './ExercisesManager.css';
import { supabase } from '../supabase';

function ExercisesManager({ user }) {
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('');
  const [newExercise, setNewExercise] = useState({ name: '', reps: '', sets: '' });

  // Взимаме всички тренировки на потребителя
  const fetchWorkouts = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setWorkouts(data);
      if (data.length > 0) {
          setWorkouts(data);
        setSelectedWorkoutId(data[0].id);
      }
    }
  }, [user]);

  // Взимаме упражненията за конкретна тренировка
  const fetchExercises = useCallback(async (workoutId) => {
    if (!workoutId) return;
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('workout_id', workoutId);

    if (!error) {
      setExercises(data || []);
    }
  }, []);

  // Зареждаме тренировките и упражненията
  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  useEffect(() => {
    if (selectedWorkoutId) {
      fetchExercises(selectedWorkoutId);
    }
  }, [selectedWorkoutId, fetchExercises]);

  // Създаваме нова тренировка
  const createWorkout = async () => {
    if (!user) return;

    const { data: existingWorkouts } = await supabase
      .from('workouts')
      .select('id')
      .eq('user_id', user.id);

    const count = existingWorkouts?.length || 0;

    const { data: newWorkout, error: insertError } = await supabase
      .from('workouts')
      .insert([{ title: `Моята тренировка ${count + 1}`, user_id: user.id }])
      .select()
      .single();

    if (!insertError && newWorkout) {
      const updated = [newWorkout, ...workouts];
      setWorkouts(updated);
      setSelectedWorkoutId(newWorkout.id);
      setExercises([]);
    } else {
      console.error('Грешка при създаване на тренировка:', insertError?.message);
    }
  };
  const handleDeleteWorkout = async (id) => {
     const confirm = window.confirm("Сигурни ли сте, че искате да изтриете тази тренировка?");
     if (!confirm) return;
   
     const { error } = await supabase.from('workouts').delete().eq('id', id);
     if (!error) {
       setWorkouts(prev => prev.filter(w => w.id !== id));
       if (id === selectedWorkoutId) {
         setSelectedWorkoutId(''); // Ако е текущата, махаме избора
         setExercises([]); // И изчистваме упражненията
       }
     } else {
       console.error('Грешка при изтриване на тренировка:', error.message);
     }
   };
   
  // Добавяне на упражнение
  const addExercise = async () => {
     if (!selectedWorkoutId) {
       alert("Моля, избери тренировка.");
       return;
     }
   
     if (!newExercise.name || !newExercise.reps || !newExercise.sets) {
       alert("Моля, попълни всички полета.");
       return;
     }
   
     const { error } = await supabase.from("exercises").insert([
       {
         workout_id: selectedWorkoutId,
         name: newExercise.name,
         reps: newExercise.reps,
         sets: newExercise.sets,
       },
     ]);
   
     if (error) {
       console.error("Грешка при добавяне:", error.message);
       alert("Грешка при запис. Виж конзолата.");
     } else {
       setNewExercise({ name: "", reps: "", sets: "" });
       fetchExercises(selectedWorkoutId); // презареждане
     }
   };
   
  // Изтриване на упражнение
  const deleteExercise = async (id) => {
    const { error } = await supabase.from('exercises').delete().eq('id', id);
    if (!error) {
      setExercises((prev) => prev.filter((ex) => ex.id !== id));
    }
  };

  return (
    <div className="exercises-container">
      <h2>Упражнения към: <span style={{ color: '#8b0000' }}>
        {workouts.find(w => w.id === selectedWorkoutId)?.title || 'Няма избрана тренировка'}
      </span></h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <select
          value={selectedWorkoutId}
          onChange={(e) => setSelectedWorkoutId(e.target.value)}
          className="dropdown"
        >
          {workouts.map((workout) => (
            <option key={workout.id} value={workout.id}>
              {workout.title}
            </option>
          ))}
        </select>
        <button onClick={createWorkout} className="create-btn">Създай нова тренировка</button>
      </div>

      {/* Списък с тренировки и бутон за изтриване */}
    <div style={{ marginTop: '10px' }}>
      <h4>Моите тренировки:</h4>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
         {workouts.map((workout) => (
       <li key={workout.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
        <span>{workout.title}</span>
        <button
          style={{ marginLeft: '10px', background: '#8b0000', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}
          onClick={() => handleDeleteWorkout(workout.id)}
        >
          Изтрий
        </button>
      </li>
    ))}
  </ul>
</div>


      {exercises.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Няма упражнения за тази тренировка.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Упражнение</th>
              <th>Повторения</th>
              <th>Серии</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((ex, i) => (
              <tr key={ex.id || i}>
                <td>{ex.name}</td>
                <td>{ex.reps}</td>
                <td>{ex.sets}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteExercise(ex.id)}>
                    Изтрий
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Добави ново</h3>
      <input
        placeholder="Име"
        value={newExercise.name}
        onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
      />
      <input
        placeholder="Повт"
        value={newExercise.reps}
        onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
      />
      <input
        placeholder="Серии"
        value={newExercise.sets}
        onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
      />
      <button onClick={addExercise}>Добави</button>
    </div>
  );
}

export default ExercisesManager;
