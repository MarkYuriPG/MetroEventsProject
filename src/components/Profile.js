import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import host from '../host.js';

function Profile() {
    const [user, setUser] = useState(null);
    // const userId = localStorage.getItem('userId'); // Assuming you have stored the user's ID in localStorage
    const { userName } = useParams();
    const decodedUserName = decodeURIComponent(userName);
    let navigate = useNavigate();

    const api = host.apiUrl;

    useEffect(() => {
        if (userName) {
            fetchUser(userName);
        }
    }, [userName]);

    const fetchUser = async (userName) => {
        try {
            const response = await axios.get(`${api}/Users/UserName/${decodedUserName}`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    // Helper function to map role numeric value to text
    const getRoleText = (role) => {
        switch (role) {
            case 0:
                return 'Regular';
            case 1:
                return 'Organizer';
            case 2:
                return 'Administrator';
            default:
                return 'Unknown';
        }
    };

    // Helper function to map status numeric value to text
    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return 'Online';
            case 1:
                return 'Offline';
            default:
                return 'Unknown';
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p>User Name: {user.userName}</p>
                    <p>User Role: {getRoleText(user.role)}</p>
                    <p>User Status: {getStatusText(user.status)}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
            <button onClick={() => navigate(-1)}>Back</button> 
        </div>
    );
}

export default Profile;
