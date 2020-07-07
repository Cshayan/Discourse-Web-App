/*
 *  Model for User
 */

// Dependencies
const mongoose = require('mongoose');

// Post Schema
const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title to the post'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description to the post'],
        trim: true,
    },
    published: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model
module.exports = mongoose.model('post', PostSchema);