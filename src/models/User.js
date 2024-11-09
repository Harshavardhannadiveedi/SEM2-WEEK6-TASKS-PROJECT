import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensure unique email
            lowercase: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['Attendee', 'Organizer'], // Default roles
            default: 'Attendee',
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
