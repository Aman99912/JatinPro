import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './auth.css';
import FloatingInput from '../../components/floating';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Basic required fields check (frontend)
    if (!formData.fullname || !formData.email || !formData.password) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/user/register', formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Create an Account 📝</p>
        <p className="message">Signup now and get full access to our app.</p>

        <FloatingInput
          label="Full Name"
          name="fullname"
          value={formData.fullname}
          setValue={(val) => setFormData((prev) => ({ ...prev, fullname: val }))}
        />

        <FloatingInput
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          setValue={(val) => setFormData((prev) => ({ ...prev, email: val }))}
        />

        <FloatingInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          setValue={(val) => setFormData((prev) => ({ ...prev, password: val }))}
        />

        <FloatingInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          setValue={(val) => setFormData((prev) => ({ ...prev, confirmPassword: val }))}
        />

        <button className="submit" type="submit">Register</button>
        <p className="signin">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
