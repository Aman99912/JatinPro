import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {

  const navigate = useNavigate();
  const email = localStorage.getItem('email')

  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome 🎉</h1>
        <p className="user-email">Logged in as: <strong>{email}</strong></p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
