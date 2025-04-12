import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import WorkoutList from './components/WorkoutList';
import AddWorkout from './components/AddWorkout';
import WorkoutPlans from './components/WorkoutPlans';
import DailyWorkouts from './components/DailyWorkouts';
import Login from './components/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const addWorkout = (workout) => {
    setWorkouts((prev) => [...prev, { ...workout, id: prev.length + 1 }]);
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
            <Navbar onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workouts" element={<WorkoutList workouts={workouts} />} />
              <Route path="/add" element={<AddWorkout onAddWorkout={addWorkout} />} />
              <Route path="/plans" element={<WorkoutPlans onSelectPlan={setSelectedPlanId} />} />
              <Route path="/plans/:id" element={<DailyWorkouts planId={selectedPlanId} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;





