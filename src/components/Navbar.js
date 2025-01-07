import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import WorkoutList from './WorkoutList';

function Navbar() {
  const [showWorkout, setShowWorkout] = useState(false);

  const workouts = [
    {
      title: 'Тренировка 1',
      exercises: [
        { name: 'Клек', reps: '3-5', sets: 4 },
        { name: 'Лежанка', reps: '4-6', sets: 4 },
        { name: 'Вертикален скрипец', reps: '6-8', sets: 4 },
        { name: 'Странично рамо с дъмбели', reps: '10-12', sets: 3 },
        { name: 'Cable Triceps Pushdown', reps: '12-15', sets: 3 },
        { name: 'Трапец с лост', reps: '10-12', sets: 3 },
      ],
    },
    {
      title: 'Тренировка 2',
      exercises: [
        { name: 'Румънска тяга', reps: '4-6', sets: 3 },
        { name: 'Български клек', reps: '6-8', sets: 3 },
        { name: 'Горна лежанка', reps: '4-6', sets: 4 },
        { name: 'Военна преса', reps: '4-6', sets: 4 },
        { name: 'Чукове с дъмбел', reps: '6-8', sets: 4 },
        { name: 'Трапец с лост', reps: '10-12', sets: 3 },
      ],
    },
  ];

  return (
    <div>
      <nav className="navbar">
        <h2 className="navbar-title">My Progress App</h2>
        <ul className="navbar-list">
          <li>
               <Link className="navbar-link" to="/workout-schedule">
               <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px', color: 'white' }} />
                Тренировъчен график
               </Link>
          </li>          
          <li>
            <button
              className="navbar-link"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowWorkout(true)}
            >
              <FontAwesomeIcon icon={faDumbbell} style={{ marginRight: '8px', color: 'white' }} />
              Тренировки
            </button>
          </li>
          <li>
            <Link className="navbar-button" to="/login">
              Вход
            </Link>
          </li>
          <li>
            <Link className="navbar-link" to="/register">
              Регистрация
            </Link>
          </li>
        </ul>
      </nav>

      {showWorkout && (
        <>
          <div className="modal-backdrop" onClick={() => setShowWorkout(false)}></div>
          <WorkoutList
            workouts={workouts}
            onClose={() => setShowWorkout(false)}
          />
        </>
      )}
    </div>
  );
}

export default Navbar;

