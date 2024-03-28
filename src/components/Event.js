import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Event() {
    const [event, setEvent] = useState(null);

    const { eventId } = useParams();

    useEffect(()=>{
        fetchEvent(parseInt(eventId,10));
    }, [])

    const fetchEvent = async (eventId) => {
        try{
            const response = await axios.get(`https://localhost:7097/api/Events/${eventId}`);
            setEvent(response.data);
        }catch(error){ 
            console.log('error fetching event', error);
        }
    };
  
    return (
        <div>
            <h1>Event: {event.eventName}</h1>
            <p>About: {event.eventDescription}</p>
            <p>Participants: Insert list of users</p>
            <p>Comments: </p>
        </div>
    );
}

export default Event;
