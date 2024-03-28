import './App.css';
import React,{useState} from 'react';
import MyAppBar from './components/MyAppBar';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Home from './components/Home';
import Events from './components/Events';
import Admin from './components/Admin';
import Menu from './components/Menu';
import Registration from './components/Registration';
import Login from './components/Login';
import Profile from './components/Profile';
import Event from './components/Event';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <MyAppBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        <Routes>
        {isLoggedIn ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/event/:eventId" element={<Event />} />
              <Route path="/" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Menu />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
