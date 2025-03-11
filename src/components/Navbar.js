import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faCalendarAlt, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import WorkoutList from './WorkoutList';
import { supabase } from '../supabase';

function Navbar({ onLogout }) {
  const [showWorkout, setShowWorkout] = useState(false);
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  // Зареждане на тренировките от Supabase
  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        console.error('Грешка при зареждане на тренировките:', error.message);
      } else {
        setWorkouts(data || []);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  // Проверка за логнат потребител
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Изход от приложението
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
            <Link className="navbar-link" to="/workout-schedule">
              <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px', color: 'white' }} />
              Тренировъчен график
            </Link>
          </li>
          <li>
            <button
              className="navbar-link"
              onClick={() => {
                setWorkouts([{ title: 'Нова тренировка', exercises: [] }]); // Започни с празна тренировка
                setShowWorkout(true);
              }}
            >
              <FontAwesomeIcon icon={faDumbbell} style={{ marginRight: '8px', color: 'white' }} />
              Тренировки
            </button>
          </li>
          {user ? (
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
          ) : null}
        </ul>
      </nav>

      {showWorkout && (
        <WorkoutList
          workouts={workouts}
          setWorkouts={setWorkouts}
          onClose={() => setShowWorkout(false)}
        />
      )}
    </div>
  );
}

export default Navbar;
