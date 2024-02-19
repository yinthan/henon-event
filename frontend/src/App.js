import './App.css';
import React, { useState, useEffect } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import EventTimeline from './components/EventTimeline';
import axios from 'axios';

const App = () => {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null); // State to keep track of the event being edited
    useEffect(() => {
        axios.get('/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const saveEvent = (eventData, id) => {
        const method = id ? 'put' : 'post';
        const url = id ? `/events/${id}` : '/events';

        axios[method](url, eventData)
            .then(response => {
                if (id) {
                    // Update local state with the updated event
                    setEvents(events.map(event => event.id === id ? response.data : event));
                } else {
                    // Add the new event to local state
                    setEvents([...events, response.data]);
                }
                setEditingEvent(null);
            })
            .catch(error => console.error('Error saving event:', error));
    };

    const editEvent = (id) => {
        const eventToEdit = events.find(event => event.id === id);
        setEditingEvent(eventToEdit); // Set the event to be edited
    };

    const cancelEdit = () => {
        setEditingEvent(null);
    };

    const deleteEvent = (id) => {
        axios.delete(`/events/${id}`)
            .then(() => {
                // Remove the event from local state
                setEvents(events.filter(event => event.id !== id));
            })
            .catch(error => console.error('Error deleting event:', error));
    };

    return (
        <div className="App">
            <EventForm onSaveEvent={saveEvent} onCancelEdit={cancelEdit} editEventData={editingEvent}/>
            <EventList events={events} onEdit={editEvent} onDelete={deleteEvent}/>
            <EventTimeline events={events}/>
        </div>
    );
};

export default App;
