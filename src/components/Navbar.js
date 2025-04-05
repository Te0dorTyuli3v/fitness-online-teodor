import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faCalendarAlt, faHome, faSignOutAlt, faTable } from '@fortawesome/free-solid-svg-icons';
import WorkoutList from './WorkoutList';
import WorkoutScheduleTable from './WorkoutScheduleTable';
import WorkoutSchedule from './WorkoutSchedule';
import { supabase } from '../supabase';

function Navbar({ onLogout }) {
  const [showWorkout, setShowWorkout] = useState(false);
  const [showScheduleTable, setShowScheduleTable] = useState(false);
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);



  // Зареждане на логнатия потребител
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    fetchUser();
  }, []);

  // Зареждане на тренировките и упражненията
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) return;

      const { data: workoutsData, error: workoutsError } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user.id);

      if (workoutsError) {
        console.error('Грешка при зареждане на тренировките:', workoutsError.message);
        return;
      }

      const workoutsWithExercises = await Promise.all(
        workoutsData.map(async (workout) => {
          const { data: exercisesData, error: exercisesError } = await supabase
            .from('exercises')
            .select('*')
            .eq('workout_id', workout.id);

          return {
            ...workout,
            exercises: exercisesError ? [] : exercisesData,
          };
        })
      );

      setWorkouts(workoutsWithExercises);
    };

    fetchWorkouts();
  }, [user]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      if (onLogout) onLogout();
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h2 className="navbar-title">My Progress App</h2>
        <ul className="navbar-list">
          <li>
            <Link className="navbar-link" to="/">
              <FontAwesomeIcon icon={faHome} style={{ marginRight: '8px', color: 'white' }} />
              Начало
            </Link>
          </li>
          <li>
  <button
    className="navbar-link"
    onClick={() => setShowCalendar(true)}
  >
    <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px', color: 'white' }} />
    Календар
  </button>
</li>

          <li>
            <button
              className="navbar-link"
              onClick={() => setShowWorkout(true)}
            >
              <FontAwesomeIcon icon={faDumbbell} style={{ marginRight: '8px', color: 'white' }} />
              Тренировки
            </button>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={() => setShowScheduleTable(true)}
            >
              <FontAwesomeIcon icon={faTable} style={{ marginRight: '8px', color: 'white' }} />
              Тренировъчен график
            </button>
          </li>
          {user && (
            <>
              <li>
                <span className="navbar-user">
                  Добре дошли, {user.email || 'Потребител'}!
                </span>
              </li>
              <li>
                <button className="navbar-link logout-button" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px', color: 'white' }} />
                  Изход
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {showWorkout && (
        <WorkoutList
          workouts={workouts}
          setWorkouts={setWorkouts}
          onClose={() => setShowWorkout(false)}
          user={user}
        />
      )}

      {showScheduleTable && (
        <div className="schedule-table-modal">
          <button className="close-button" onClick={() => setShowScheduleTable(false)}>X</button>
          <WorkoutScheduleTable user={user} />
        </div>
      )}
      
    </div>
  );
}

export default Navbar;
