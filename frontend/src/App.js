import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Base URL for the backend API
const API_URL = 'http://localhost:5000/todos';

function App() {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);
  // State for the new todo input field
  const [newTodoText, setNewTodoText] = useState('');

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array means this runs once on mount

  // Function to fetch all todo items from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Function to add a new todo item
  const addTodo = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    if (!newTodoText.trim()) return; // Don't add empty todos

    try {
      const response = await axios.post(API_URL, { text: newTodoText });
      setTodos([...todos, response.data]); // Add new todo to the list
      setNewTodoText(''); // Clear input field
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Function to toggle the 'completed' status of a todo
  const toggleTodoCompleted = async (id, completed) => {
    try {
      // Send PUT request to update todo's completed status
      const response = await axios.put(`${API_URL}/${id}`, { completed: !completed });
      // Update the todo in the local state
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  // Function to delete a todo item
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`); // Send DELETE request
      setTodos(todos.filter(todo => todo._id !== id)); // Remove todo from local state
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <h1>Simple Todo List</h1>

      {/* Form for adding new todos */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo item..."
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* List to display todo items */}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
            {/* Click to toggle completed status */}
            <span onClick={() => toggleTodoCompleted(todo._id, todo.completed)}>
              {todo.text}
            </span>
            {/* Button to delete todo */}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
