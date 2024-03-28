import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Card({ event }) {
    const [userEvents, setUserEvents] = useState([]);
    const [sent, setSent] = useState(false);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        fetchUserEvents();
        setUserId(parseInt(localStorage.getItem('userId'), 10));
    }, []);

    useEffect(() => {
        checkRequest();
    }, [userEvents]);

    const fetchUserEvents = async () => {
        try {
            const response = await axios.get(`https://localhost:7097/api/UserEvents`);
            setUserEvents(response.data);
            checkRequest();
        } catch (error) {
            console.log("error fetching userevents");
        }
    };

    const handleJoinRequest = async (eventId) => {
        try {
            await axios.post(`https://localhost:7097/api/UserEvents?eventId=${eventId}&userId=${userId}`);
            fetchUserEvents();
            console.log("Request created");
        } catch (error) {
            console.log("Error join request", error);
        }
    };

    const checkRequest = () => {
        if (userEvents.length > 0) {
            setSent(userEvents.some(e => e.userId === userId && e.eventId === event.eventId));
        } else {
            setSent(false);
        }
    };

    return (
        <div className="event-card">
            <h2>{event.eventName}</h2>
            <p>{event.eventDescription}</p>
            <p>Organizer: {event.organizer}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            <button onClick={() => handleJoinRequest(event.eventId)} disabled={sent}>
                {sent ? 'Request Sent' : 'Request to Join'}
            </button>
        </div>
    );
}

export default Card;
