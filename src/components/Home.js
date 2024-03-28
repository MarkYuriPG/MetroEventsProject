import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import CreateEventDialog from './CreateEventDialog';

function Home() {
    const [events, setEvents] = useState([]);
    const [approvedEvents, setApprovedEvents] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userEvents, setUserEvents] = useState([]);
    const [showCreateEvent, setShowCreateEvent] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [showEventRequests, setShowEventRequests] = useState(false);
    const [showRefresh, setShowRefresh] = useState(false);
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchEvents();
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            fetchUserEvents(storedUserId);
            fetchUserRole(storedUserId);
        }
        fetchUsers();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('https://localhost:7097/api/Events');
            setEvents(response.data);
            setApprovedEvents(response.data.filter(event => event.approval === 2));
            console.log(events);
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

    const fetchUserRole = async (userId) => {
        try {
            const response = await axios.get(`https://localhost:7097/api/Users/Get/${userId}`);
            setUserRole(response.data.role);
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };

    const fetchUsers = async () => {
        try{
            const response = await axios.get(`https://localhost:7097/api/Users/Get`);
            setUsers(response.data);
        }catch(error){
            console.error('Error fetching users.', error);
        }
    };

    const fetchUserByUsername = (username) => {
        const organizer = users.find(user => user.userName === username);
        if(organizer == null)
            console.log("organizer is null");
        setUser(organizer);
    };

    const hasOrganized = () => {
        const name = user.userName;
        const hasOrganizedEvents = events.find(event => event.organizer === name && event.approval === 2);
        return !!hasOrganizedEvents;
    };

    const updateUserRole = async () => {
        try{
            if (hasOrganized()) {
                // If the user has organized events and their role is not already 1, set it to 1
                if (user.role !== 1) {
                    user.role = 1;
                }
            } else {
                // If the user hasn't organized any events or their events aren't approved, set the role back to 0
                user.role = 0;
            }

            const response = await axios.put(`https://localhost:7097/api/Users/Update`, user);
            console.log(response);
        }catch (error) {
            console.log("Error updating role", error);
        }
    };

    const isEventLikedByUser = (eventId) => {
        return userEvents.some(userEvent => userEvent.eventId === eventId);
    };

    const handleCreateEventOpen = () => {
        setShowCreateEvent(true);
      };
    
      const handleCreateEventClose = () => {
        setShowCreateEvent(false);
      };

    const handleOnclickEventRequest = () => {
        if(showEventRequests && showRefresh)
        {
            setShowEventRequests(false);
            setShowRefresh(false);
        }
        else
        {
            setShowEventRequests(true);
            setShowRefresh(true);
        }
    };

    const handleApprove = async (eventId) => {
        try {
            // Fetch the event details from events state
            
            const eventToUpdate = events.find(event => event.eventId === eventId);
            if (!eventToUpdate) {
                console.error('Event not found');
                return;
            }

            fetchUserByUsername(eventToUpdate.organizer);
            const newApprovalStatus = eventToUpdate.approval === 2 ? 0 : 2; // Toggle between Approved (2) and Pending (0)

            // Update the approval status
            eventToUpdate.approval = newApprovalStatus;
    
            // Make a PUT request to update the event
            await axios.put(`https://localhost:7097/api/Events`, eventToUpdate);
            
            // Fetch updated events after approval
            updateUserRole();
            fetchEvents();
        } catch (error) {
            console.error("Failed to update approval status:", error);
        }
    };

    const handleReject = async (eventId) => {
        // Display a confirmation dialog
        const confirmReject = window.confirm("Are you sure you want to reject this event?");
        if (confirmReject) {
            try {
                await axios.delete(`https://localhost:7097/api/Events/${eventId}`);

                fetchEvents();
                console.log("Event rejected:", eventId);
            } catch (error) {
                console.error("Error rejecting event:", error);
            }
        }
    };

    const getStatus = (status) => {
        switch (status) {
            case 0:
                return 'Pending';
            case 1:
                return 'Rejected';
            case 2:
                return 'Approved';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="event-container">
            <button onClick={handleCreateEventOpen}>Create Event</button>
            {userRole === 2 && (
                <button onClick={handleOnclickEventRequest}>Event Requests</button>
            )}
            {userRole === 1 && (
                <button>Organize Events</button>
            )}
            {showRefresh && (<button onClick={fetchEvents}>Refresh</button>)}
            {showEventRequests && (
                <div className="table-container">
                    <table className='event-table'>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Event Name</th>
                                <th>Organizer</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>No. of Participants</th>
                                <th>Status</th>
                                <th>Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(request => (
                                <tr key={request.eventId}>
                                    <td>{request.date}</td>
                                    <td>{request.eventName}</td>
                                    <td>{request.organizer}</td>
                                    <td>{request.eventDescription}</td>
                                    <td>{request.location}</td>
                                    <td>{request.likes}</td>
                                    <td>{getStatus(request.approval)}</td>
                                    <td>
                                    {getStatus(request.approval) === 'Approved' ? (
                                        <button onClick={() => handleApprove(request.eventId)}>Disapprove</button>
                                    ) : (
                                        <button onClick={() => handleApprove(request.eventId)}>Approve</button>
                                    )}  
                                        {getStatus(request.approval) !== 'Approved' && (
                                            <button onClick={() => handleReject(request.eventId)}>Reject</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="event-cards">
                {approvedEvents.map(event => (
                    <Card
                        key={event.eventId}
                        event={event}
                        onLike={() => isEventLikedByUser(event.eventId) ? handleUnlikeEvent(event.eventId) : handleLikeEvent(event.eventId)}
                        isLiked={isEventLikedByUser(event.eventId)}
                    />
                ))}
            </div>
            {showCreateEvent && <CreateEventDialog onClose={handleCreateEventClose} organizer={userId}/>}
        </div>
    );
}

export default Home;