import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './src/router/authRoutes.js';  
import eventRouter from './src/router/eventRoutes.js';  
import connectDB from './src/config/DBconnection.js'; 

dotenv.config();  

const app = express();
const PORT = process.env.PORT || 7001;  

app.use(cors());  
app.use(express.json());  

app.use('/api/auth', authRouter);  
app.use('/api/events', eventRouter);  

app.listen(PORT, () => {
    connectDB(); 
    console.log(`Server is running on port ${PORT}`);
});
