const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to enable Cross-Origin Resource Sharing (CORS) for frontend communication
app.use(cors());

// MongoDB Connection Setup
// IMPORTANT: Replace 'YOUR_MONGODB_CONNECTION_STRING' with your actual MongoDB connection string.
// Example: 'mongodb://localhost:27017/todoapp' or a MongoDB Atlas connection string.
const mongoURI = 'YOUR_MONGODB_CONNECTION_STRING';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully!');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Import and use todo routes
const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter); // All requests to /todos will be handled by todosRouter

// Server Port Configuration
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
