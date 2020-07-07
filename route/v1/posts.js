/*
 *  CRUD API for Post routes
 */

// Dependencies
const express = require('express');
const router = express.Router();

// Get the controller methods
const {
    getAllPosts,
    getPostsOfUser,
    createPost,
    updatePost,
    deletePost
} = require('../../controller/v1/posts');

// Get the protect middleware
const {
    protect
} = require('../../middleware/auth');

// Route Handling
router.route('/').get(getAllPosts).post(protect, createPost);
router.route('/:postid').put(protect, updatePost).delete(protect, deletePost);
router.route('/users').get(protect, getPostsOfUser);

// Export router
module.exports = router;