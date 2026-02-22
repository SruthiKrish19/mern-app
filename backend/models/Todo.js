const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Todo model
// This schema defines the structure and types of data for todo items in MongoDB.
const TodoSchema = new Schema({
    // 'text' stores the description of the todo item. It's required.
    text: {
        type: String,
        required: true
    },
    // 'completed' indicates if the todo is done. Defaults to false.
    completed: {
        type: Boolean,
        default: false
    }
});

// Export the Todo model. 'Todo' will be the name of the collection in MongoDB.
module.exports = mongoose.model('Todo', TodoSchema);
