import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Event from './Event';
import host from '../host.js';

import { Button, Typography } from '@mui/material';
import { buttonStyles, secondaryButtonStyles } from './styled_components/Styles.js';
import '../App.css';

function Card({ event }) {
    const [userEvents, setUserEvents] = useState([]);
    const [userId, setUserId] = useState(0);

    const api = host.apiUrl;

    useEffect(() => {
        fetchUserEvents();
        setUserId(parseInt(localStorage.getItem('userId'), 10));
    }, []);

    useEffect(() => {
        checkRequest();
    }, [userEvents]);

    const fetchUserEvents = async () => {
        try {
            const response = await axios.get(`${api}/UserEvents`);
            setUserEvents(response.data);
        } catch (error) {
            console.log("Error fetching user events:", error);
        }
    };

    const handleJoinRequest = async (eventId) => {
        try {
            await axios.post(`${api}/UserEvents?eventId=${eventId}&userId=${userId}`);
            fetchUserEvents();
            console.log("Request created");
        } catch (error) {
            console.log("Error join request", error);
        }
    };

    const isPending = () => {
        // Check if the user has already sent a request for the event
        return userEvents.some(e => e.userId === userId && e.eventId === event.eventId && e.status === 0);
    };

    const checkRequest = () => {
        // Check if the user has already joined the event
        const joinedEvent = userEvents.find(e => e.userId === userId && e.eventId === event.eventId);
        return joinedEvent && joinedEvent.status === 2;
    };

    return (
        <div className="event-card">
            <div className="event-content">
                <h2>{event.eventName}</h2>
                <p>{event.eventDescription}</p>
                <p>Organizer: {event.organizer}</p>
                <p>Date: {event.date}</p>
                <p>Location: {event.location}</p>
            </div>
            <div className="event-buttons-container">
                {checkRequest() ? (
                    <p>Already Joined</p>
                ) : (
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={() => handleJoinRequest(event.eventId)} disabled={isPending()}
                        sx={{
                            ...buttonStyles,
                            width: '200px',
                        }}
                    >
                        {isPending() ? "Request Sent" : "Request to Join"}
                    </Button>
                )}
                <Button
                    variant="contained"
                    component={Link}
                    to={`/event/${encodeURIComponent(event.eventName)}`}
                    sx={{
                        ...secondaryButtonStyles,
                        width: '200px',
                    }}
                >
                    View Details
                </Button>
            </div>
        </div>
    );
}

export default Card;
