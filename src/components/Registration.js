import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 0,
    status: 0,
  });

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
       const response = await axios.post('https://localhost:7097/api/Users', dataToSend);
       console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleCancel = () => {
    window.location.href = '/';
  };

  return (
    <div className="form-view">
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
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
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
        >
          Register
        </Button>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </form>
      <Typography variant="body2">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </div>
  );
}

export default Registration;
