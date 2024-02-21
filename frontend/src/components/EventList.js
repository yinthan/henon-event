import React from 'react';

const EventList = ({ events, onEdit, onDelete }) => {
    return (
        <ul className="EventList">
            {events.map(event => (
                <li key={event._id}>
                    <div className="EventList-item-details">
                        {event.title} - {event.type} from {new Date(event.startDate).toLocaleDateString()} to {new Date(event.endDate).toLocaleDateString()}
                    </div>
                    <div className="EventList-item-actions">
                        <button className="button-edit" onClick={() => onEdit(event._id)}>Edit</button>
                        <button className="button-delete" onClick={() => onDelete(event._id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default EventList;
