import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import WorkoutList from './components/WorkoutList';
import AddWorkout from './components/AddWorkout';
import Home from './components/Home';
import WorkoutPlans from './components/WorkoutPlans';
import DailyWorkouts from './components/DailyWorkouts';
import WorkoutScheduleTable from './components/WorkoutScheduleTable';
import WorkoutSchedule from './components/WorkoutSchedule';
import ExercisesManager from './components/ExercisesManager';
import Login from './components/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [user, setUser] = useState(null);

  const addWorkout = (workout) => {
    setWorkouts((prevWorkouts) => [
      ...prevWorkouts,
      { ...workout, id: prevWorkouts.length + 1 }
    ]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        ) : (
          <>
            <Navbar onLogout={handleLogout} user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workouts" element={<WorkoutList workouts={workouts} />} />
              <Route path="/add" element={<AddWorkout onAddWorkout={addWorkout} />} />
              <Route path="/plans" element={<WorkoutPlans onSelectPlan={setSelectedPlanId} />} />
              <Route path="/plans/:id" element={<DailyWorkouts planId={selectedPlanId} />} />
              <Route path="/workout-schedule" element={<WorkoutSchedule />} />
              <Route path="/schedule" element={<WorkoutScheduleTable user={user} />} />
              <Route path="/exercises" element={<ExercisesManager user={user} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;






