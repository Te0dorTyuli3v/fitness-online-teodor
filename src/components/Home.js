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
      <h2>
  Добре Дошли в <span style={{ color: '#e0e0e0' }}>My Progress App</span>
</h2>

  <ul>
    <li>"My Progress App" е приложение, предназначено за физически активни хора. Предоставя на потребителите възможност за създаване, редактиране, управление и проследяване на своите тренировъчни планове, упражнения и графици. Приложението цели да улесни личната организация и да стимулира физическата активност чрез дигитален подход, съобразен със съвременните технологични стандарти.
    </li>  
    <li>Предлага достъп до онлайн профил, който позволява на потребителите да имат достъп до своите тренировъчни планове по всяко време и навсякъде.</li>    
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
