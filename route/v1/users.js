/*
 *  Router file for User authentication
 */

// Dependencies
const express = require('express');
const router = express.Router();

// Get the controller methods
const {
    registerUser,
    loginUser,
    getMe
} = require('../../controller/v1/users');

// Protect Middleware
const {
    protect
} = require('../../middleware/auth');

// Route Handling
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);

// Export router
module.exports = router;