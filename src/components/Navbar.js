import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faCalendarAlt, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import WorkoutList from './WorkoutList';
import { supabase } from '../supabase'; // Импортирайте Supabase

function Navbar() {
  const [showWorkout, setShowWorkout] = useState(false);
  const [user, setUser] = useState(null); // Управление на състоянието на потребителя
  const navigate = useNavigate();

  // Проверка за логнат потребител
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        setUser(data.user); // Задаваме user, ако е успешно извлечен
      } else {
        setUser(null);
        console.error(error?.message || 'Потребителят не може да бъде извлечен');
      }
    };

    fetchUser();
  }, []);

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
    {
      title: 'Тренировка 3',
      exercises: [
        { name: 'Гребане с лост', reps: '6-8', sets: 4 },
        { name: 'Долна лежанка', reps: '4-6', sets: 4 },
        { name: 'Задно рамо с дъмбел', reps: '8-10', sets: 3 },
        { name: 'Лежанка за трицепс', reps: '6-8', sets: 4 },
        { name: 'Бицепс с дъмбел от горен лег', reps: '8-10', sets: 3 },
        { name: 'Трапец с лост', reps: '10-12', sets: 3 },
      ],
    },
  ];
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); // Изход от Supabase
    if (!error) {
      setUser(null);
      navigate('/login'); // Пренасочване към страницата за вход
    } else {
      console.error('Грешка при изход:', error.message);
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
              style={{ cursor: 'pointer' }}
              onClick={() => setShowWorkout(true)}
            >
              <FontAwesomeIcon icon={faDumbbell} style={{ marginRight: '8px', color: 'white' }} />
              Тренировки
            </button>
          </li>
          {user ? (
            <li>
              <button
                className="navbar-link logout-button"
                style={{ cursor: 'pointer', color: 'white' }}
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px', color: 'white' }} />
                Изход
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link className="navbar-link" to="/login">
                  Вход
                </Link>
              </li>
              <li>
                <Link className="navbar-link" to="/register">
                  Регистрация
                </Link>
              </li>
            </>
          )}
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


