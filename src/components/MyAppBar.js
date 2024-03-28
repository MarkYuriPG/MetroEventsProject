import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function MyAppBar({ isLoggedIn, handleLogout }) {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          Metro Events
        </Typography>
        <div sx={{ display: 'flex', alignItems: 'center' }}>
          <Button component={Link} to="/home" variant="text" sx={{ color: 'white', marginRight: 2 }}>
            Home
          </Button>
          <Button component={Link} to="/profile" variant="text" sx={{ color: 'white', marginRight: 2 }}>
            Profile
          </Button>
          <Button component={Link} to="/Events" variant="text" sx={{ color: 'white' }}>
            Events
          </Button>
          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="text" sx={{ color: 'white' }}>
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/login" variant="text" sx={{ color: 'white' }}>
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default MyAppBar;
