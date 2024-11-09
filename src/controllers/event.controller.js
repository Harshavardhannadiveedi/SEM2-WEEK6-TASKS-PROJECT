import Event from '../models/Event.js';

// Create an event
export const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, organizerId } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            organizer: organizerId,
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.log('Error in createEvent controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        console.log('Error in getAllEvents controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Register for an event
export const registerForEvent = async (req, res) => {
    try {
        const { userId, eventId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(400).json({ error: 'Event not found' });
        }

        event.attendees.push(userId);
        await event.save();

        res.status(200).json({ message: 'Registered for event successfully' });
    } catch (error) {
        console.log('Error in registerForEvent controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
