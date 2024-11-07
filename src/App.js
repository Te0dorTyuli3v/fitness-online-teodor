import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import WorkoutList from './components/WorkoutList';
import AddWorkout from './components/AddWorkout';
import Home from './components/Home';
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

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<WorkoutList workouts={workouts} />} />
          <Route path="/add" element={<AddWorkout onAddWorkout={addWorkout} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
