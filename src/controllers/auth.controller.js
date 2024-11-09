import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Register a new user (Organizer/Attendee)
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            passwordHash: hashedPassword,
            role: 'Attendee', // Default role
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        });
    } catch (error) {
        console.log('Error in register controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Log in a user
export const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare password with stored hash
        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        req.session.userId = user._id; // Store user ID in session
        res.status(200).json({
            success: true,
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.log('Error in logIn controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Log out a user
export const logoutUser = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to log out' });
            }
            res.status(200).json({ message: 'Logged out successfully' });
        });
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
