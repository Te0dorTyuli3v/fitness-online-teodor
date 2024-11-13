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
      <h2>Добре дошли във "Фитнес Онлайн Теодор"</h2>
      <p>Това приложение ще ви помогне да следите и организирате тренировките си. Ако искате да се насладите на просто приложение, което е готово и чака да започнете, Фитнес Онлайн Теодор е очевидно едно от най-добрите тренировъчни приложения без никакви излишни опции, които да пречат на преживяването Ви. На базата на различни части от тялото е съставен и категоризиран дълъг списък от упражнения.</p>

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
