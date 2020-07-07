/*
 * File for error handling
 */

// REQUIRE
const errorResponse = require('../utils/ErrorResponse');

// Error handler function
const errorHandler = (err, req, res, next) => {

    let error = {
        ...err
    };
    error.message = err.message;

    // Handle Cast Error
    if (err.name === 'CastError') {
        const message = `Resource not found with id ${err.value}`;
        error = new errorResponse(message, 404);
    }

    // Duplicate field value
    if (err.code == 11000) {
        const message = 'Duplicate field value entered';
        error = new errorResponse(message, 400);
    }

    // Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new errorResponse(message, 400);
    }

    // Send response
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;