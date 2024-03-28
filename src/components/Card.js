import React from 'react';

function Card({ event, onJoinRequest }) {
    return (
        <div className="event-card">
            <h2>{event.eventName}</h2>
            <p>{event.eventDescription}</p>
            <p>Organizer: {event.organizer}</p>
            <p>Date: {event.date}</p>
            <p>Location: {event.location}</p>
            {/* <p>Likes: {isLiked ? event.likes + 1 : event.likes}</p> */}
            {/* Change button text based on whether the event is liked or not */}
            {/* <button onClick={onLike}>{isLiked ? 'Unlike' : 'Like'}</button> */}
            <button onClick={onJoinRequest}>Request to Join</button>
        </div>
    );
}

export default Card;
