import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
import host from '../host.js';
import { buttonStyles, textFieldStyles } from './styled_components/Styles.js';
import '../App.css';

function LoginScreen({ setIsLoggedIn, setUserRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const api = host.apiUrl;

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
        const response = await axios.post(`${api}/Users/Login/${username}&${password}`);
        console.log('Login successful:', response.data);
        const { userId } = response.data; // Assuming server returns userId
        localStorage.setItem('userId', userId);
        setIsLoggedIn(true);
        setLoginMessage('Login successful');
        navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      setLoginMessage('Login failed. Check your Username or Password.');
    }
  };

  return (
    <div className="form-view" >
      <div className="form-container">
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
            sx={textFieldStyles}
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
            sx={textFieldStyles}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={buttonStyles} 
          >
            Login
          </Button>
        </form>
        {loginMessage && (
          <Typography variant="body2" color={loginMessage.includes('successful') ? 'green' : 'red'}>
            {loginMessage}
          </Typography>
        )}
        <Typography variant="body2">
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#cb3f63', fontWeight: 'bold' }}>
            Register
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default LoginScreen;
