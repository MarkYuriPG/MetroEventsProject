import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function CreateEventDialog({ onClose, organizer }) {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(true);
  const [organizerName, setOrganizerName] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://localhost:7097/api/Users/Get/${organizer}`);
        setUser(response.data);
        setOrganizerName(response.data.userName);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []); 
    
  const handleSubmit = async () => {
    try {
      const event = {
        eventName: eventName,
        eventDescription: eventDescription,
        organizer: organizerName,
        location: location,
        date: formatDate(date),
        likes: 0,
        isApproved: false,
      };
  
      await axios.post('https://localhost:7097/api/Events', event);
      alert('Event creation request sent successfully!');
      onClose(); // Close the dialog
    } catch (error) {
      console.error('Error sending event creation request:', error);
      alert('Failed to send event creation request. Please try again later.');
    }
  };

  const formatDate = (date) => {
    if (!date) return '';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const handleChangeDate=(date)=>{
    setDate(date);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the following information to create the event:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="eventName"
          label="Event Name"
          type="text"
          fullWidth
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="eventDescription"
          label="Event Description"
          type="text"
          fullWidth
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <DatePicker
          selected = {date}
          onChange = {handleChangeDate}
        />
        <TextField
          margin="dense"
          id="location"
          label="Location"
          type="text"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create Event</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateEventDialog;
