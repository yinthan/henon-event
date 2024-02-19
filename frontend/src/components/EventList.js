import React from 'react';

const EventList = ({ events, onEdit, onDelete }) => {
    return (
        <ul className="EventList">
            {events.map(event => (
                <li key={event._id}> {/* Use _id instead of id */}
                    <div className="EventList-item-details">
                        {event.title} - {event.type} from {event.startDate} to {event.endDate}
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
