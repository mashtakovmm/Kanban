import React from 'react';
import './css/App.css';
import Home from './components/home';
import TaskDetail from './components/TaskDetail';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:listid/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
