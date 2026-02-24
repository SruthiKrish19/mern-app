const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to enable Cross-Origin Resource Sharing (CORS) for frontend communication
app.use(cors());

// MongoDB Connection Setup
// IMPORTANT: Set `MONGO_URI` in the environment or replace the fallback below.
// Example: 'mongodb://localhost:27017/todoapp' or a MongoDB Atlas connection string.
const mongoURI = 'mongodb://localhost:27017/todoappp'; // Fallback URI for local development

mongoose.connect(mongoURI)
.then(() => {
    console.log('MongoDB connected successfully!');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Import and use todo routes (mount at /api/v1/to-do per technical plan)
const todosRouter = require('./routes/todos');
app.use('/api/v1/to-do', todosRouter);

// Server Port Configuration
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
