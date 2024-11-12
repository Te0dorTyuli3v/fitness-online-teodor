import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

function WorkoutPlans({ onSelectPlan }) {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from('workout_plans')
        .select('*');
      if (error) console.log('Error fetching workout plans:', error);
      else setPlans(data);
    };

    fetchPlans();
  }, []);

  const handlePlanClick = (planId) => {
    onSelectPlan(planId); // Изпращаме избрания план нагоре
    navigate(`/plans/${planId}`); // Навигираме към страницата за конкретния план
  };

  return (
    <div>
      <h3>Тренировъчни планове</h3>
      <ul>
        {plans.map(plan => (
          <li key={plan.id} onClick={() => handlePlanClick(plan.id)}>
            <h4>{plan.name}</h4>
            <p>{plan.description}</p>
            <p>Ниво: {plan.level}</p>
            <p>Продължителност: {plan.duration} дни</p>
            {plan.image_url && <img src={plan.image_url} alt={plan.name} style={{ maxWidth: '100%' }} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutPlans;
