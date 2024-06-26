import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import host from '../host.js';

function Organizer({ users, events }){
    const [userEvents, setUserEvents] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const api = host.apiUrl;

    useEffect(() => {
        // Fetch user events when the component mounts
        fetchUserEvents();
    }, [refresh]); // Re-fetch user events when 'refresh' state changes

    const fetchUserEvents = async () => {
        try {
            const response = await axios.get(`${api}/UserEvents`);
            setUserEvents(response.data);
        } catch (error) {
            console.error('Error fetching user events:', error);
        }
    };

    const getUserById = (userId) =>{
        const user = users.find(u => u.userId === userId);
        return user;
    };

    const getEventById = (eventId) => {
        const eventt = events.find(e => e.eventId === eventId);
        return eventt;
    };

    const organizedEvents = events.filter(event => event.organizer === getUserById(parseInt(localStorage.getItem('userId'),10)).userName);
    const filteredUserEvents = userEvents.filter(event => organizedEvents.some(orgEvent => orgEvent.eventId === event.eventId));
    const pendingUserEvents = filteredUserEvents.filter(e => e.status === 0);

    const handleAccept = async (userId, eventId) => {
        // Implement accept logic here
        console.log('Accepted', userId, eventId);
        // Perform accept operation (e.g., send HTTP request)
        // After successful operation, set 'refresh' state to true to force rerender
        const userEvent = {
            userId: userId,
            eventId: eventId,
            status: 2
        }

        try{
            await axios.put(`${api}/UserEvents`, userEvent)
            setRefresh(prev => !prev);
        }catch(error)
        {
            console.log("error updating userevent", error);
        }
    };

    const handleDecline = async (userId, eventId) => {
        console.log('Declined', userId, eventId);
        try {
            await axios.delete(`${api}/UserEvents/${userId}/${eventId}`);
            // Remove the declined UserEvent from the local state
            // Update the state to reflect the change
            setRefresh(prev => !prev);
        } catch (error) {
            console.log("Error declining request:", error);
            // Display an error message to the user
        }
    };

    return(
        <div className="table-container">
            <table className='event-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Event</th>
                        <th>Requests</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingUserEvents.map(req => {
                        const user = getUserById(req.userId);
                        if (user) {
                            return (
                                <tr key={req.userId && req.eventId}>
                                    <td>
                                        <Link to={`/profile/${encodeURIComponent(user.userName)}`}>
                                            {user.userName}
                                        </Link>
                                    </td>
                                    <td>{getEventById(req.eventId).eventName}</td>
                                    <td>
                                        <button onClick={() => handleAccept(req.userId, req.eventId)}>Accept</button>
                                        <button onClick={() => handleDecline(req.userId, req.eventId)}>Decline</button>
                                    </td>
                                </tr>
                            );
                        } else {
                            console.log(`User with ID ${req.userId} does not exist.`);
                            return null; // Skip rendering this event
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Organizer;
