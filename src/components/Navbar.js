import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Увери се, че импортваш правилния CSS файл
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import HomeIcon from './HomeIcon';

function Navbar() {
  return (
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
            {/* Добавяне на иконката с бял цвят */}
            <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '8px', color: 'white' }} />
            Тренировъчен график
          </Link>
        </li>
        <li>
          <Link className="navbar-link" to="/workouts">
            <FontAwesomeIcon icon={faDumbbell} style={{ marginRight: '8px', color: 'white' }} />
            Тренировки
          </Link>
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
  );
}

export default Navbar;

