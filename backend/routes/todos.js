const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo'); // Import the Todo model to interact with the database

// GET all todo items
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single todo by ID
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST a new todo item
router.post('/', async (req, res) => {
    const { title, description, due, is_active } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const todo = new Todo({
        title,
        description: description || '',
        due: due ? new Date(due) : null,
        is_active: is_active === undefined ? true : !!is_active
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) an existing todo item by ID
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        const { title, description, due, is_active } = req.body;
        if (title !== undefined) todo.title = title;
        if (description !== undefined) todo.description = description;
        if (due !== undefined) todo.due = due ? new Date(due) : null;
        if (is_active !== undefined) todo.is_active = !!is_active;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a todo item by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; // Export the router for use in server.js
