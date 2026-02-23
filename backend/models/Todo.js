const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Basic Todo schema following the technical plan (no audit fields)
const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    due: {
        type: Date,
        default: null
    },
    is_active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Todo', TodoSchema);
