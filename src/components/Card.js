import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Event from './Event';

function Card({ event }) {
    const [userEvents, setUserEvents] = useState([]);
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
        } catch (error) {
            console.log("Error fetching user events:", error);
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
        // Check if the user has already joined the event
        const joinedEvent = userEvents.find(e => e.userId === userId && e.eventId === event.eventId);
        return joinedEvent && joinedEvent.status === 2;
    };

    return (
        <div className="event-card">
            <h2>{event.eventName}</h2>
            <p>{event.eventDescription}</p>
            <p>Organizer: {event.organizer}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            {checkRequest() ? (
                <p>Already Joined</p>
            ) : (
                <button onClick={() => handleJoinRequest(event.eventId)} disabled={!!userEvents.find(e => e.userId === userId && e.eventId === event.eventId)}>
                    Request to Join
                </button>
            )}
            <Link to={`/event/${event.eventId}`}>View Details</Link>
        </div>
    );
}

export default Card;
