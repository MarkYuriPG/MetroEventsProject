import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import host from '../host.js';
import { buttonStyles, secondaryButtonStyles, textFieldStyles } from './styled_components/Styles.js';
import '../App.css';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 0,
    status: 0,
  });
  const [registrationMessage, setRegistrationMessage] = useState(null);

  const api = host.apiUrl;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'role' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const roleIndex = parseInt(formData.role);
       const dataToSend = { ...formData, role: roleIndex };
       const response = await axios.post(`${api}/Users`, dataToSend);
       setRegistrationMessage('Registration successful');
       console.log('Registration successful:', response.data);
    } catch (error) {
      setRegistrationMessage('Registration failed. User already exists.');
      console.error('Registration failed:', error);
    }
  };

  const handleCancel = () => {
    window.location.href = '/';
  };

  return (
    <div className="form-view">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="registration-form">
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
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
            value={formData.password}
            onChange={handleChange}
            required
            sx={textFieldStyles}
          />
          <FormControl fullWidth variant="outlined" margin="normal" sx={textFieldStyles}>
            <InputLabel id="role-label" sx={textFieldStyles}>Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
              required
            >
              <MenuItem value={0}>Regular User</MenuItem>
              <MenuItem value={2}>Administrator</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={buttonStyles}
          >
            Register
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={handleCancel}
            sx={secondaryButtonStyles}
          >
            Cancel
          </Button>
        </form>
        {registrationMessage && (
          <Typography variant="body2" color={registrationMessage.includes('successful') ? 'green' : 'red'}>
            {registrationMessage}
          </Typography>
        )}
        <Typography variant="body2">
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: '#cb3f63', fontWeight: 'bold' }}>
            Login
          </Link>
        </Typography>
      </div>
    </div>
  );
}

export default Registration;
