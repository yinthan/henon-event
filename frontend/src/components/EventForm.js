import React, { useState, useEffect } from 'react';

const EventForm = ({ onSaveEvent, onCancelEdit, editEventData }) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Effect to pre-populate form when editing an event
    useEffect(() => {
        if (editEventData) {
            setTitle(editEventData.title);
            setType(editEventData.type);
            setStartDate(editEventData.startDate);
            setEndDate(editEventData.endDate);
            setIsEditing(true);
        } else {
            resetForm();
        }
    }, [editEventData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = { title, type, startDate, endDate };

        // Pass the event id if we are in editing mode
        onSaveEvent(eventData, editEventData ? editEventData.id : null);

        // Reset form
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setType('');
        setStartDate('');
        setEndDate('');
        setIsEditing(false);
    };

    const handleCancel = () => {
        resetForm();
        onCancelEdit(); // Call the onCancelEdit prop to reset the edit state in the parent component
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <select value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="">Select Type</option>
                <option value="Merger">Merger</option>
                <option value="Dividends">Dividends</option>
                <option value="New Capital">New Capital</option>
                <option value="Hire">Hire</option>
            </select>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
            />
            <button type="submit" className="button-save">
                {isEditing ? 'Update Event' : 'Save Event'}
            </button>
            {isEditing && (
                <button type="button" onClick={handleCancel} className="button-cancel">
                    Cancel
                </button>
            )}
        </form>
    );
};

export default EventForm;
