import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Увери се, че импортваш правилния CSS файл
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import WorkoutList from './WorkoutList'; // Импортирай компонента с тренировките


function Navbar() {
  const [showWorkout, setShowWorkout] = useState(false);

  // Примерен масив с данни за тренировките
  const workouts = [
    { name: 'Клек', reps: '3-5', sets: 4 },
    { name: 'Лежанка', reps: '4-6', sets: 4 },
    { name: 'Вертикален скрипец', reps: '6-8', sets: 4 },
    { name: 'Странично рамо с дъмбели', reps: '10-12', sets: 3 },
    { name: 'Cable Triceps Pushdown', reps: '12-15', sets: 3 },
    { name: 'Трапец с лост', reps: '10-12', sets: 3 },
  ];

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
            <Link className="navbar-link" to="/workouts">
              <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px', color: 'white' }} />
              Тренировъчен график
            </Link>
          </li>
          <li>
            <button
              className="navbar-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
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

      {/* Показване на прозореца за тренировките */}
{showWorkout && (
  <>
    <div className="modal-backdrop" onClick={() => setShowWorkout(false)}></div> {/* Затъмнен фон */}
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
