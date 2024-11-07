import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h2>Фитнес Онлайн Теодор</h2>
      <ul>
        <li><Link to="/">Начало</Link></li>
        <li><Link to="/workouts">Списък с Тренировки</Link></li>
        <li><Link to="/add">Добави Тренировка</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
