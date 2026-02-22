# Simple MERN Stack Todo List Application

This project is a very minimal and beginner-friendly Todo List application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It demonstrates the basic Create, Read, Update, and Delete (CRUD) operations, making it an excellent starting point for learning full-stack development.

## Features

*   **Create:** Add new todo items.
*   **Read:** View all existing todo items.
*   **Update:** Mark todo items as completed/incomplete.
*   **Delete:** Remove todo items from the list.

## Technologies Used

*   **MongoDB:** A NoSQL database for storing todo items.
*   **Express.js:** A Node.js web application framework for building the backend API.
*   **React:** A JavaScript library for building user interfaces (the frontend).
*   **Node.js:** A JavaScript runtime for running the backend server.
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **Axios:** A promise-based HTTP client for the browser and Node.js, used for API requests from the frontend.
*   **CORS:** Middleware to enable Cross-Origin Resource Sharing.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js & npm:** Download and install from [nodejs.org](https://nodejs.org/). `npm` (Node Package Manager) is included with Node.js.
*   **MongoDB:**
    *   **Local Installation:** Follow the instructions on [mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/).
    *   **MongoDB Atlas (Cloud):** Recommended for ease of setup. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas) to get a cloud-hosted database and connection string.
*   **A Code Editor:** Such as [VS Code](https://code.visualstudio.com/).
*   **A Web Browser:** (e.g., Chrome, Firefox).

## Setup Instructions

Follow these steps to get the application up and running on your local machine.

### Step 1: Navigate to the Project Directory

Open your terminal or command prompt and navigate to the root directory of this project:

```bash
cd /Users/sruthikrishnakumar/Documents/mern-app
```

### Step 2: Backend Setup

The backend handles the API requests and interacts with the MongoDB database.

1.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure MongoDB Connection:**
    *   Open the file `backend/server.js` in your code editor.
    *   Locate the line:
        ```javascript
        const mongoURI = 'YOUR_MONGODB_CONNECTION_STRING';
        ```
    *   **Replace `'YOUR_MONGODB_CONNECTION_STRING'` with your actual MongoDB connection string.**
        *   **Local MongoDB:** Typically looks like `mongodb://localhost:27017/todoapp` (you can choose your database name, e.g., `todoapp`).
        *   **MongoDB Atlas:** Copy the connection string provided by Atlas (usually starts with `mongodb+srv://`). Remember to replace `<username>` and `<password>` with your database user credentials.

4.  **Start the Backend Server:**
    ```bash
    node server.js
    ```
    You should see messages in your terminal indicating that "MongoDB connected successfully!" and "Server is running on port: 5000".
    **Keep this terminal window open; the backend server must be running for the frontend to work.**

### Step 3: Frontend Setup

The frontend is the React application that provides the user interface.

1.  **Open a NEW terminal or command prompt window.**
2.  **Navigate to the frontend folder:**
    ```bash
    cd /Users/sruthikrishnakumar/Documents/mern-app/frontend
    ```
    (Ensure you are in a new terminal and not the one running the backend server).

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the Frontend Development Server:**
    ```bash
    npm start
    ```
    This command will start the React development server. It should automatically open a new tab in your default web browser at `http://localhost:3000`. If it doesn't, manually open your browser and go to `http://localhost:3000`.

## Usage

Once both the backend and frontend servers are running:

*   You will see a simple Todo List interface.
*   **Add Todo:** Type a new todo item in the input field and click "Add Todo".
*   **Mark as Completed/Incomplete:** Click on the text of a todo item to toggle its completed status (it will get a strikethrough).
*   **Delete Todo:** Click the "Delete" button next to a todo item to remove it.

Enjoy your MERN Stack Todo List!

## Troubleshooting

*   **"MongoDB connection error"**:
    *   Double-check your `mongoURI` in `backend/server.js`. Ensure it's correct and that your MongoDB instance is running and accessible.
    *   If using MongoDB Atlas, make sure your IP address is whitelisted in your Atlas project.
*   **Frontend not loading/showing data**:
    *   Ensure the backend server (`node server.js`) is running in a separate terminal window.
    *   Check your browser's developer console for any network errors (e.g., failed to fetch).
    *   Verify that `API_URL` in `frontend/src/App.js` is `http://localhost:5000/todos`.
*   **CORS errors**:
    *   If you see "Cross-Origin Request Blocked" errors, double-check that `app.use(cors());` is present in `backend/server.js`.
*   **Port already in use**:
    *   If `npm start` or `node server.js` fails with a port error, another application might be using that port. You can try changing the port in `backend/server.js` (e.g., to 5001) and also update `API_URL` in `frontend/src/App.js` accordingly.

If you encounter any other issues, feel free to ask!
