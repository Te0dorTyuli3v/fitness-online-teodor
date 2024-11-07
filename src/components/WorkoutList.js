import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pushupImage from '../assets/pushups.jpg'; // Снимка за лицеви опори
import runningImage from '../assets/running.jpg'; // Снимка за бягане
import squatsImage from '../assets/squats.jpg'; // Снимка за клякания
import plankImage from '../assets/plank.jpg'; // Снимка за планк

function WorkoutList() {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Лицеви опори", description: "20 лицеви опори", duration: "5 мин", image: pushupImage },
    { id: 2, name: "Бягане", description: "10 минути бягане", duration: "10 мин", image: runningImage },
    { id: 3, name: "Клякания", description: "15 клякания", duration: "5 мин", image: squatsImage },
    { id: 4, name: "Планк", description: "Задръжка на планк за 1 минута", duration: "1 мин", image: plankImage }
  ]);

  return (
     <div>
       <h3>Твоите Тренировки</h3>
       {workouts.length > 0 ? (
         <ul>
           {workouts.map((workout) => (
             <li key={workout.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
               <div style={{ flex: 1 }}>
                 <h4>{workout.name}</h4>
                 <p>{workout.description}</p>
                 <p>Продължителност: {workout.duration}</p>
               </div>
               {/* Показваме изображението вдясно, ако тренировката има такова */}
               {workout.image && (
                 <img
                   src={workout.image}
                   alt={workout.name}
                   style={{ width: '220px', height: '120px', marginLeft: '15px', borderRadius: '8px' }}
                 />
               )}
             </li>
           ))}
         </ul>
       ) : (
         <p>Все още няма добавени тренировки. <Link to="/add">Добави нова тренировка</Link>.</p>
       )}
     </div>
   );
 }
 
 export default WorkoutList;