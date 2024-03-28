import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

function LoginScreen({ setIsLoggedIn, setUserRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`https://localhost:7097/api/Users/Login/${username}&${password}`);
        console.log('Login successful:', response.data);
        const { userId } = response.data; // Assuming server returns userId
        localStorage.setItem('userId', userId);
        setIsLoggedIn(true);
        navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="form-view">
      <form onSubmit={handleSubmit} className="login-form">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>
      <Typography variant="body2">
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </div>
  );
}

export default LoginScreen;
