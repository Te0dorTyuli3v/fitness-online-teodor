import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

function Home() {
  const [homepageContent, setHomepageContent] = useState(null);

  useEffect(() => {
    // Функция за извличане на данните от Supabase
    const fetchHomepageContent = async () => {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('*')
        .single(); // Извличаме само един запис
      if (error) {
        console.log('Error fetching homepage content:', error);
      } else {
        setHomepageContent(data);
      }
    };

    fetchHomepageContent();
  }, []);

  return (
    <div>
      <div className="welcome-text">
  <h2>Добре Дошли в My Progress App</h2>
  <ul>
    <li>My Progress App е приложение, което ви помага да следите и организирате тренировките си, като предоставя персонализирани тренировъчни планове и прогрес.</li>
    <li>Приложението My Fitness App е предназначено да предоставя персонализирани тренировъчни програми, съобразени с индивидуалните цели и предпочитания на потребителите.</li>
    <li>Предлага достъп до онлайн профил, който позволява на потребителите да имат достъп до своите тренировъчни планове по всяко време и навсякъде.</li>
    <li>Основните функции на приложението включват:</li>
    <ul>
      <li>Персонализирани тренировъчни планове: Създаване на индивидуални програми, съобразени с възрастта, нивото на подготовка и способностите на потребителя.</li>
      <li>Достъп до тренировъчни видеа: Възможност за преглед на инструкции и демонстрации на упражнения, които подпомагат правилното изпълнение на тренировките.</li>
      <li>Проследяване на напредъка: Функционалности за записване и анализ на постигнатите резултати.</li>
    </ul>
  </ul>
</div>


      {/* Показване на изображението, ако има данни */}
      {homepageContent && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <img
            src={homepageContent.image_url}
            alt={homepageContent.title}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <p>{homepageContent.title}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
