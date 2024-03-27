import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import Card from './Card'; // Import Card component
import CreateEventDialog from './CreateEventDialog';

function Home() {
    const [events, setEvents] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userEvents, setUserEvents] = useState([]);
    const [showCreateEvent, setShowCreateEvent] = useState(false);

    useEffect(() => {
        fetchEvents();
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            fetchUserEvents(storedUserId); // Fetch user's liked events
        }
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('https://localhost:7097/api/Events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Function to fetch user's liked events from the backend
    const fetchUserEvents = async (userId) => {
        try {
            const response = await axios.get(`https://localhost:7097/api/UserEvents`);
            const filteredUserEvents = response.data.filter(userEvent => userEvent.userId === parseInt(userId,10));
            console.log(filteredUserEvents);
            setUserEvents(filteredUserEvents);
        } catch (error) {
            console.error('Error fetching user events:', error);
        }
    };

    const handleLikeEvent = async (eventId) => {
        console.log(eventId + " " + userId);
        try {
            // Make a POST request to create a new UserEvent association
            await axios.post(`https://localhost:7097/api/UserEvents?eventId=${eventId}&userId=${userId}`);
            setUserEvents(prevUserEvents => [...prevUserEvents, { eventId, userId }]);
            console.log("Successfully added UserEvent:", { eventId, userId });
        } catch (error) {
            console.error('Error liking event:', error);
        }
    };

    const handleUnlikeEvent = async (eventId) => {
        try {
            // Find the UserEvent association to delete
            const targetUserEvent = userEvents.find(userEvent => userEvent.eventId === eventId);
            if (!targetUserEvent) {
                console.error('UserEvent association not found');
                return;
            }
            // Make a DELETE request to remove the UserEvent association
            await axios.delete(`https://localhost:7097/api/UserEvents/${userId}/${eventId}`);
            // Update the userEvents state to reflect the change
            setUserEvents(prevUserEvents => prevUserEvents.filter(userEvent => userEvent.eventId !== eventId));
            console.log("success delete");
        } catch (error) {
            console.error('Error unliking event:', error);
        }
    };

    // Function to check if an event is liked by the user
    const isEventLikedByUser = (eventId) => {
        // Check if the event is in the userEvents array
        return userEvents.some(userEvent => userEvent.eventId === eventId);
    };

    const handleCreateEventOpen = () => {
        setShowCreateEvent(true);
      };
    
      const handleCreateEventClose = () => {
        setShowCreateEvent(false);
      };

    return (
        <div className="event-container">
            <button onClick={handleCreateEventOpen}>Create Event</button>
            <div className="event-cards">
                {events.map(event => (
                    <Card
                        key={event.eventId}
                        event={event}
                        onLike={() => isEventLikedByUser(event.eventId) ? handleUnlikeEvent(event.eventId) : handleLikeEvent(event.eventId)}
                        isLiked={isEventLikedByUser(event.eventId)}
                    />
                ))}
            </div>
            {showCreateEvent && <CreateEventDialog onClose={handleCreateEventClose} />}
        </div>
    );
}

export default Home;
