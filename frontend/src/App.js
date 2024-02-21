import './App.css';
import React, { useState, useEffect } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import EventTimeline from './components/EventTimeline';
import axios from './axios';

const App = () => {
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null); // State to keep track of the event being edited

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios.get('/events')
            .then(response => {
                const formattedEvents = response.data.map(event => ({
                    ...event,
                    startDate: new Date(event.startDate).toLocaleDateString(),
                    endDate: new Date(event.endDate).toLocaleDateString()
                }));
                setEvents(formattedEvents);
            })
            .catch(error => console.error('Error fetching events:', error));
    };

    const saveEvent = (eventData, id) => {
        const method = id ? 'put' : 'post';
        const url = id ? `/events/${id}` : '/events';

        axios[method](url, eventData)
            .then(response => {
                if (id) {
                    // Editing an existing event
                    setEvents(prevEvents => prevEvents.map(event =>
                        event._id === id ? { ...event, ...response.data, startDate: new Date(response.data.startDate).toLocaleDateString(), endDate: new Date(response.data.endDate).toLocaleDateString() } : event
                    ));
                } else {
                    // Adding a new event
                    setEvents(prevEvents => [...prevEvents, { ...response.data, startDate: new Date(response.data.startDate).toLocaleDateString(), endDate: new Date(response.data.endDate).toLocaleDateString() }]);
                }
                setEditingEvent(null);
            })
            .catch(error => console.error('Error saving event:', error))
            .finally(() => {
                // Refresh the event list and timeline view
                fetchEvents();
            });
    };


    const editEvent = (id) => {
        const eventToEdit = events.find(event => event._id === id);
        setEditingEvent(eventToEdit); // Set the event to be edited
    };

    const cancelEdit = () => {
        setEditingEvent(null);
    };

    const deleteEvent = (id) => {
        axios.delete(`/events/${id}`)
            .then(() => {
                // Remove the event from local state
                setEvents(events.filter(event => event._id !== id));
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
