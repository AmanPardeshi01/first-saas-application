import express from 'express';
import usersRouter from './routes/usersRouter.js';
import connectDB from './utils/connectDb.js';
import dotenv from 'dotenv';

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());


// Routers
app.use('/api/v1/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})