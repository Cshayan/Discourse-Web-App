/*
 * File to handle verify token and authorise and protect the routes
 */

// Dependencies
const jwt = require('jsonwebtoken');

// ErrorResponse Class
const ErrorResponse = require('../utils/ErrorResponse');

// Async Handler
const asyncHandler = require('./async');

// User Model
const User = require('../model/User');

/** Function to protect the routes **/
exports.protect = asyncHandler(async (req, res, next) => {

    // get the token
    let token = req.headers.authorization;

    if (!token) {
        return next(new ErrorResponse('Unauthorised access', 401));
    }

    //verify token
    try {
        const decodedtoken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedtoken.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('Unauthorised access', 401));
    }
});