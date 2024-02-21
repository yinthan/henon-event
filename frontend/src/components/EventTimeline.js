import React, { useEffect, useRef } from 'react';
import { Timeline, DataSet } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';

const EventTimeline = ({ events }) => {
    const timelineRef = useRef();
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const groups = new DataSet();
            const items = new DataSet();

            events.forEach((event, index) => {
                const startDateTime = new Date(event.startDate).getTime() - (28 * 24 * 60 * 60 * 1000);
                const endDateTime = new Date(event.endDate).getTime() - (27.5 * 24 * 60 * 60 * 1000);
                if (!isNaN(startDateTime) && !isNaN(endDateTime)) {
                    const startDate = new Date(startDateTime);
                    const endDate = new Date(endDateTime);

                    groups.add({
                        id: index,
                        content: event.title,
                    });

                    items.add({
                        id: event._id,
                        group: index,
                        start: startDate,
                        end: endDate,
                        type: 'range',
                        className: `type-${event.type ? event.type.replace(/\s/g, '-').toLowerCase() : ''}`,
                    });
                }
            });

            const options = {
                stack: false,
                horizontalScroll: true,
                zoomable: false,
                moveable: true,
                maxHeight: '400px',
                orientation: { axis: 'top', item: 'top' },
                // Other options...
            };

            timelineRef.current = new Timeline(containerRef.current, items, options);
            timelineRef.current.setGroups(groups);

            // Set the window to zoom out a bit initially
            const twoWeeksAgo = new Date(Date.now() - (14 * 24 * 60 * 60 * 1000));
            const inSixWeeks = new Date(Date.now() + (42 * 24 * 60 * 60 * 1000));
            timelineRef.current.setWindow(twoWeeksAgo, inSixWeeks);
        }

        return () => {
            if (timelineRef.current) {
                timelineRef.current.destroy();
                timelineRef.current = null;
            }
        };
    }, [events]);

    return <div ref={containerRef} style={{ height: '400px', width: '100%' }} />;
};

export default EventTimeline;

