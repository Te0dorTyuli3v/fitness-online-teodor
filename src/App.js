import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import WorkoutList from './components/WorkoutList';
import AddWorkout from './components/AddWorkout';
import Home from './components/Home';
import WorkoutPlans from './components/WorkoutPlans';
import DailyWorkouts from './components/DailyWorkouts';
import './App.css';

function App() {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Лицеви опори", description: "20 лицеви опори", duration: "5 мин" },
    { id: 2, name: "Бягане", description: "10 минути бягане", duration: "10 мин" },
  ]);

  const addWorkout = (workout) => {
    setWorkouts((prevWorkouts) => [
      ...prevWorkouts,
      { ...workout, id: prevWorkouts.length + 1 }
    ]);
  };

  // Състояние за избор на тренировъчен план
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<WorkoutList workouts={workouts} />} />
          <Route path="/add" element={<AddWorkout onAddWorkout={addWorkout} />} />
          
          {/* Добавяне на нови маршрути за тренировъчни планове */}
          <Route path="/plans" element={<WorkoutPlans onSelectPlan={setSelectedPlanId} />} />
          <Route path="/plans/:id" element={<DailyWorkouts planId={selectedPlanId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
