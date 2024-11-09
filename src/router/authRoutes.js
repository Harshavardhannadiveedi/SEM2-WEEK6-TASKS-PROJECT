import express from 'express';
import { registerUser, logInUser, logoutUser } from '../controllers/auth.Controller.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Log in an existing user
router.post('/login', logInUser);

// Log out a user
router.get('/logout', logoutUser);

export default router;
