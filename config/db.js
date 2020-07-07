/*
 *  File to connect to MongoDB with mongoose
 */

// Dependencies
const mongoose = require('mongoose');

// Export the connectDB function to be used in other file
const connectDB = async () => {
    const conn = mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    console.log('MongoDB connected successfully');
};

// Export the function
module.exports = connectDB;