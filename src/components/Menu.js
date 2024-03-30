import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { buttonStyles } from './styled_components/Styles.js';

function Menu() {
  return (
    <div className="menu-container">
      <h1>Menu</h1>
      <Button
        variant="contained"
        component={Link}
        to={`/login`}
        sx={{
            ...buttonStyles,
            width: '200px',
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        component={Link}
        to={`/register`}
        sx={{
            ...buttonStyles,
            width: '200px',
        }}
      >
        Register
      </Button>
    </div>
  );
}

export default Menu;
