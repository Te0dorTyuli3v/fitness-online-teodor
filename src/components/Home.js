// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import exerciseImage from '../assets/exercises-for-beginners.jpg'; // Импортирай изображението

function Home() {
  return (
    <div>
      <h2>Добре дошли във "Фитнес Онлайн Теодор"</h2>
      <p>Това приложение ще ви помогне да следите и организирате тренировките си. Можете да добавяте тренировки, като попълните името, описанието и продължителността на всяка тренировка.</p>
      <p>Започнете, като добавите първата си тренировка, или разгледайте списъка с текущи тренировки.</p>

      <div>
        <Link to="/add">
          <button>Добави Нова Тренировка</button>
        </Link>
      </div>

      {/* Добавяме изображението със стилове */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3>Упражнения за Начинаещи</h3>
        <img src={exerciseImage} alt="Упражнения за начинаещи" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
      </div>
    </div>
  );
}

export default Home;
