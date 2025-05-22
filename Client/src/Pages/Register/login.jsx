import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import FloatingInput from '../../components/floating';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill all required fields');
      return;
    }

    try {
     const res = await axios.post('http://localhost:8000/api/user/login', formData);

localStorage.setItem('token', res.data.token); // ✅ Save token
localStorage.setItem('userEmail', res.data.user.email); // Optional
navigate('/');

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Welcome Back 👋</p>
        <p className="message">Please log in to continue</p>

        <FloatingInput
          label="Email"
          required
          name="email"
          type="email"
          value={formData.email}
          setValue={(val) => setFormData({ ...formData, email: val })}
        />

        <FloatingInput
          label="Password"
          required
          name="password"
          type="password"
          value={formData.password}
          setValue={(val) => setFormData({ ...formData, password: val })}
        />

        <button className="submit" type="submit">Login</button>

        <p className="signin">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
