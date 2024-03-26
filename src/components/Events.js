import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Events() {
    const [events,setEvents] = useState([]);
    const [formData, setFormData] = useState({ eventName: '', eventDescription: '' });
    const [editableData, setEditableData] = useState({});
    const [isEditable, setIsEditable] = useState({});
  
    useEffect(() => {
      GetEvents();
    }, []);
  
    const GetEvents = () => {
      axios.get('https://localhost:7097/api/Events')
        .then((response) => {
          console.log(response.data);
          setEvents(response.data);
        })
        .catch((error) => {
          console.log("error");
        });
    };
  
    const CreateEvent = () => {
      axios.post('https://localhost:7097/api/Events', formData)
        .then(() => {
          console.log(formData);
          GetEvents();
          setFormData({ eventName: '', eventDescription: '' });
        })
        .catch((error) => {
          console.log("error");
        });
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const DeleteEvent = (eventId) => {
      if (window.confirm("Are you sure you want to delete this event?")) {
        axios.delete(`https://localhost:7097/api/Events/${eventId}`)
          .then(() => {
            console.log("Event deleted successfully");
            GetEvents();
          })
          .catch((error) => {
            console.log("error");
          });
      }
    };
  
    const handleEditClick = (eventId) => {
      setIsEditable(prevState => ({
        ...prevState,
        [eventId]: true
      }));
  
      setEditableData(prevData => ({
        ...prevData,
        [eventId]: { ...events.find(event => event.eventId === eventId) }
      }));
    };
  
    const handleCancelEdit = (eventId) => {
      setIsEditable(prevState => ({
        ...prevState,
        [eventId]: false
      }));
  
    };
  
    const handleInputChange = (eventId, fieldName, value) => {
      setEditableData(prevData => ({
        ...prevData,
        [eventId]: {
          ...prevData[eventId],
          [fieldName]: value
        }
      }));
    };
  
    const handleSaveEdit = (eventId) => {
      if (window.confirm("Are you sure you want to save the changes?")) {
        axios.put(`https://localhost:7097/api/Events`, editableData[eventId])
          .then(() => {
            console.log(editableData);
            GetEvents();
            setIsEditable(prevState => ({
              ...prevState,
              [eventId]: false
            }));
          })
          .catch((error) => {
            console.log("error");
          });
      }
    };
  return (
    <div>
    <h2>Events</h2>
        <div className="table-container">
            <table className='event-table'>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>Event Name</th>
                        <th style={{ textAlign: 'center' }}>Event Description</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.eventId}>
                            <td>
                                {isEditable[event.eventId] ? (
                                    <input
                                        type="text"
                                        value={editableData[event.eventId]?.eventName || ''}
                                        onChange={(e) => handleInputChange(event.eventId, 'eventName', e.target.value)} />
                                ) : (
                                    event.eventName
                                )}
                            </td>
                            <td>
                                {isEditable[event.eventId] ? (
                                    <input
                                        type="text"
                                        value={editableData[event.eventId]?.eventDescription || ''}
                                        onChange={(e) => handleInputChange(event.eventId, 'eventDescription', e.target.value)} />
                                ) : (
                                    event.eventDescription
                                )}
                            </td>
                            <td style={{ justifyContent: 'center', justifyItems: 'center' }}>
                                {isEditable[event.eventId] ? (
                                    <>
                                        <button onClick={() => handleSaveEdit(event.eventId, formData)}>Save</button>
                                        <button onClick={() => handleCancelEdit(event.eventId)}>Cancel</button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEditClick(event.eventId)}>Edit</button>
                                )}
                                <button onClick={() => DeleteEvent(event.eventId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div><div style={{ textAlign: 'center', paddingBlockEnd: '40px' }}>
                <input type="text" name="eventName"
                    placeholder="Event Name" value={formData.eventName}
                    onChange={handleChange}
                    style={{ padding: '8px', marginRight: '10px' }} />
                <input type="text" name="eventDescription"
                    placeholder="Event Description" value={formData.eventDescription}
                    onChange={handleChange}
                    style={{ padding: '8px', marginRight: '10px' }} />
                <button
                    onClick={CreateEvent}
                    style={{ padding: '8px 16px' }}>Create</button>
        </div>
    </div>
  );
}

export default Events;
