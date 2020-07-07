/*
 *  Entry Point for back-end (server.js)
 */

// Dependencies
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Error handler
const errorHandler = require('./middleware/error');

// Load env file
dotenv.config({
    path: './config/config.env'
});

// Load DB file
const connectDB = require('./config/db');

// Route Imports
const userRoute = require('./route/v1/users');
const postRoute = require('./route/v1/posts');

// Connect to DB
connectDB();

// Init express
const app = express();

// BodyParser middleware
app.use(express.json());

// CORS
app.use(cors());

/** ROUTE Settings **/
app.use('/api/v1/users', userRoute);
app.use('/api/v1/posts', postRoute);
/** Route ends here **/

// ErrorHandler Middleware
app.use(errorHandler);

// Listen to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));