import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Base URL for the backend API (matches backend mount)
const API_URL = 'http://localhost:5000/api/v1/to-do';

function App() {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);
  // Form state for create/edit
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [due, setDue] = useState(''); // yyyy-mm-dd
  const [editingId, setEditingId] = useState(null);

  // Fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array means this runs once on mount

  // Function to fetch all todo items from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Function to add a new todo item
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return; // title required per backend

    const payload = {
      title: title.trim(),
      description: description || '',
      due: due ? new Date(due).toISOString() : null
    };

    try {
      if (editingId) {
        const response = await axios.put(`${API_URL}/${editingId}`, payload);
        setTodos(todos.map(t => (t._id === editingId ? response.data : t)));
        setEditingId(null);
      } else {
        const response = await axios.post(API_URL, payload);
        setTodos([...todos, response.data]);
      }

      // clear form
      setTitle('');
      setDescription('');
      setDue('');
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  // Function to toggle the 'completed' status of a todo
  const toggleIsActive = async (id, isActive) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { is_active: !isActive });
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error toggling active:', error);
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

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setTitle(todo.title || '');
    setDescription(todo.description || '');
    setDue(todo.due ? new Date(todo.due).toISOString().slice(0,10) : '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setDue('');
  };

  return (
    <div className="App">
      <h1>Simple Todo List</h1>

      {/* Form for creating / editing todos */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
        <button type="submit">{editingId ? 'Save' : 'Add'}</button>
        {editingId && <button type="button" onClick={cancelEdit}>Cancel</button>}
      </form>

      {/* List to display todo items */}
      <table className="todo-table">
        <thead>
          <tr>
            <th></th>
            <th>Todo List</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id} className={!todo.is_active ? 'inactive' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={!todo.is_active ? false : true}
                  onChange={() => toggleIsActive(todo._id, todo.is_active)}
                />
              </td>
              <td className="title-cell">{todo.title}</td>
              <td>{todo.due ? new Date(todo.due).toLocaleDateString() : '-'}</td>
              <td>
                <button onClick={() => startEdit(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
