import express from 'express';
import { createEvent, getAllEvents, registerForEvent } from '../controllers/event.controller.js';

const router = express.Router();

// Create an event
router.post('/create', createEvent);

// Get all events
router.get('/', getAllEvents);

// Register for an event
router.post('/register', registerForEvent);

export default router;
