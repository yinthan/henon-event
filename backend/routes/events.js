const router = require('express').Router();
let Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Add a new event
router.post('/', async (req, res) => {
    const { title, type, startDate, endDate } = req.body;
    const newEvent = new Event({
        title,
        type,
        startDate,
        endDate,
    });
    try {
        await newEvent.save();
        res.json('Event added!');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Update an event by id
router.route('/:id').put(async (req, res) => {
    try {
        const { title, type, startDate, endDate } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { title, type, startDate, endDate },
            { new: true } // This option will return the updated document
        );
        if (!updatedEvent) {
            return res.status(404).send('Event not found');
        }
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an event
router.route('/:id').delete(async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json('Event deleted.');
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
