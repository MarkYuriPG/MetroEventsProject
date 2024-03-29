import React from 'react';
import { Link } from 'react-router-dom';


function Menu() {
  return (
    <div>
      <h1>Menu</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default Menu;
