import React, {useState,useEffect} from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MyAppBar({ isLoggedIn, handleLogout }) {
  const [user, setUser] = useState(null);
  const userId = parseInt(localStorage.getItem('userId'),10);
  
  useEffect(()=>{
    if(userId)
    {
      fetchUser(userId);
    }
  }, [userId])

  const fetchUser = async (userId) => {
    try{
      const response = await axios.get(`https://localhost:7097/api/Users/${userId}`);
      setUser(response.data);
    }catch(error){ 
      console.log("error fetching user");
    }
  };

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
          {isLoggedIn ? (
            <>
              {user && ( // Only render Profile button if user exists
                <Button component={Link} to={`/profile/${encodeURIComponent(user.userName)}`} variant="text" sx={{ color: 'white', marginRight: 2 }}>
                  Profile
                </Button>
              )}
              <Button onClick={handleLogout} variant="text" sx={{ color: 'white' }}>
                Logout
              </Button>
            </>
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
