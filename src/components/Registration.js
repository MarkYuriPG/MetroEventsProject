import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';

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
       const response = await axios.post('https://localhost:7097/api/Users/Create', dataToSend);
       console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleCancel = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange} required >
            <option value={0}>Regular User</option>
            <option value={2}>Administrator</option>
          </select>
        </div>
        <button type="submit">Register</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Registration;
