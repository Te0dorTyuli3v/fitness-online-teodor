import React from 'react';

function Home() {
  return (
    <div>
      <h2>Добре дошли във "Фитнес Онлайн Теодор"</h2>
      <p>Това приложение ще ви помогне да следите и организирате тренировките си.</p>

      {/* Показване на изображението за заглавната страница */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <img
          src="https://qrvndfonrxroszabnxhz.supabase.co/storage/v1/object/public/workout-images/exercises-for-beginners.jpg"
          alt="Упражнения за начинаещи"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
}

export default Home;
