import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import resumeRoutes from './routes/resumeRoutes';

const path = require('path');
require('./config/firebase'); // Initialize Firebase Admin

dotenv.config({ path: path.join(__dirname, '../.env') }); // Load env vars from root .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api/resume', resumeRoutes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json("Server is running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
