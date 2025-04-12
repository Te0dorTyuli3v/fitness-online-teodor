import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faCalendarAlt, faHome, faSignOutAlt, faTable } from '@fortawesome/free-solid-svg-icons';
import WorkoutScheduleTable from './WorkoutScheduleTable';
import WorkoutSchedule from './WorkoutSchedule';
import ExercisesManager from './ExercisesManager';
import { supabase } from '../supabase';

function Navbar({ onLogout }) {
  const [user, setUser] = useState(null);
  const [showScheduleTable, setShowScheduleTable] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showExercises, setShowExercises] = useState(false);
  const [calendarRefreshKey, setCalendarRefreshKey] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    if (onLogout) onLogout();
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
            <button className="navbar-link" onClick={() => {
              setShowCalendar(true);
              setCalendarRefreshKey(prev => prev + 1);
            }}>
              <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px', color: 'white' }} />
              Календар
            </button>
          </li>
          <li>
            <button className="navbar-link" onClick={() => setShowExercises(true)}>
              <FontAwesomeIcon icon={faDumbbell} style={{ marginRight: '8px', color: 'white' }} />
              Тренировъчни упражнения
            </button>
          </li>
          <li>
            <button className="navbar-link" onClick={() => setShowScheduleTable(true)}>
              <FontAwesomeIcon icon={faTable} style={{ marginRight: '8px', color: 'white' }} />
              Тренировъчен график
            </button>
          </li>
          {user && (
            <>
              <li>
                <span className="navbar-user">Добре дошли, {user.email}!</span>
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

      {/* MODALS */}
      {showCalendar && (
        <div className="schedule-table-modal">
          <button className="close-button" onClick={() => setShowCalendar(false)}>X</button>
          <WorkoutSchedule onClose={() => setShowCalendar(false)} refreshTrigger={calendarRefreshKey} />
        </div>
      )}

      {showScheduleTable && (
        <div className="schedule-table-modal">
          <button className="close-button" onClick={() => setShowScheduleTable(false)}>X</button>
          <WorkoutScheduleTable user={user} />
        </div>
      )}

      {showExercises && (
        <div className="schedule-table-modal">
          <button className="close-button" onClick={() => setShowExercises(false)}>X</button>
          <ExercisesManager user={user} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
