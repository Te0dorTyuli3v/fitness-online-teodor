import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Увери се, че импортваш правилния CSS файл

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">My Progress Guru</h2>
      <ul className="navbar-list">
        <li><Link className="navbar-link" to="/">Начало</Link></li>
        <li><Link className="navbar-link" to="/workouts">Списък с Тренировки</Link></li>
        <li><Link className="navbar-link" to="/add">Добави Тренировка</Link></li>
        <li><Link className="navbar-button" to="/login">Вход</Link></li> {/* Линк към login страницата */}
        <li><Link className="navbar-link" to="/register">Регистрация</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
