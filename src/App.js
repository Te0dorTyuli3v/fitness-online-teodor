import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import WorkoutList from './components/WorkoutList';
import AddWorkout from './components/AddWorkout';
import Home from './components/Home';
import WorkoutPlans from './components/WorkoutPlans';
import DailyWorkouts from './components/DailyWorkouts';
import WorkoutSchedule from './components/WorkoutSchedule';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import ChangePassword from './components/ChangePassword';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Състояние за автентикация
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

  const [selectedPlanId, setSelectedPlanId] = useState(null);

  return (
    <Router>
      <div className="App">
        {/* Проверка за автентикация */}
        {!isAuthenticated ? (
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workouts" element={<WorkoutList workouts={workouts} />} />
              <Route path="/add" element={<AddWorkout onAddWorkout={addWorkout} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/plans" element={<WorkoutPlans onSelectPlan={setSelectedPlanId} />} />
              <Route path="/plans/:id" element={<DailyWorkouts planId={selectedPlanId} />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/workout-schedule" element={<WorkoutSchedule />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;

