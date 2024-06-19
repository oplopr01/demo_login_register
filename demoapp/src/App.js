
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import 'bootstrap/dist/css/bootstrap.min.css';


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/LoginForm';
import Home from './components/Home'; // Create a Home component for your application

const App = () => {
  return (
    <Router>
      <ToastContainer /> {/* ToastContainer for displaying toast notifications */}
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;