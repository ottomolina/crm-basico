import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './components/views/Home';
import { Login } from './components/views/login/Login';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="*" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
