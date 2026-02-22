const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo'); // Import the Todo model to interact with the database

// GET all todo items
// Handles requests to retrieve all todos from the database.
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find(); // Find all documents in the 'todos' collection
        res.json(todos); // Send todos as JSON response
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
});

// POST a new todo item
// Handles requests to create a new todo item.
router.post('/', async (req, res) => {
    const todo = new Todo({
        text: req.body.text // Get todo text from request body
    });

    try {
        const newTodo = await todo.save(); // Save the new todo to the database
        res.status(201).json(newTodo); // Respond with the created todo
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle validation errors
    }
});

// PUT (Update) an existing todo item by ID
// Handles requests to update a todo item's text or completed status.
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id); // Find the todo by ID from URL params

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (req.body.text) {
            todo.text = req.body.text; // Update text if provided
        }
        if (req.body.completed !== undefined) {
            todo.completed = req.body.completed; // Update completed status if provided
        }

        const updatedTodo = await todo.save(); // Save the updated todo
        res.json(updatedTodo); // Respond with the updated todo
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle errors (e.g., invalid ID)
    }
});

// DELETE a todo item by ID
// Handles requests to delete a todo item.
router.delete('/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete(req.params.id); // Find and delete the todo

        if (!result) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' }); // Respond with success message
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle server errors
    }
});

module.exports = router; // Export the router for use in server.js
