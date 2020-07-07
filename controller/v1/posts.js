/* Contoller methods for CRUD operations related to posts */

// Bring in models
const Post = require('../../model/Post');
const User = require('../../model/User');

// Async Handler
const asyncHandler = require('../../middleware/async');

// ErrorResponse 
const ErrorResponse = require('../../utils/ErrorResponse');

/*
 *  Endpoint - GET api/v1/posts
 *  Purpose - Gets all the posts
 *  Access - Public
 */
exports.getAllPosts = asyncHandler(async (req, res, next) => {

    // find all posts
    const posts = await Post.find().populate('user', ['name', 'email']);

    // response
    res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
    });
});

/*
 *  Endpoint - GET api/v1/posts/users
 *  Purpose - Gets all the posts of the current user
 *  Access - Private
 */
exports.getPostsOfUser = asyncHandler(async (req, res, next) => {

    // find the posts by user
    const posts = await Post.find({
        user: req.user.id
    }).populate('user', ['name', 'email']);

    if (posts.length === 0) {
        return next(new ErrorResponse('No posts found for the user', 400));
    }

    // response
    res.status(200).json({
        success: true,
        data: posts
    });
});

/*
 *  Endpoint - POST api/v1/posts
 *  Purpose - Create a new post
 *  Access - Private
 */
exports.createPost = asyncHandler(async (req, res, next) => {

    req.body.user = req.user.id;
    const post = await Post.create(req.body);

    // response
    res.status(201).json({
        success: true,
        msg: 'Post created',
        data: post
    });
});

/*
 *  Endpoint - PUT api/v1/posts/:postid
 *  Purpose - Updates an existing post
 *  Access - Private
 */
exports.updatePost = asyncHandler(async (req, res, next) => {

    // find the post to update
    let post = await Post.findById(req.params.postid);

    if (!post) {
        return next(new ErrorResponse('No post with that id exists', 400));
    }

    if (post.user.toString() !== req.user.id) {
        return next(new ErrorResponse('User is not authorised to update other user\'s post.', 400));
    }

    post = await Post.findByIdAndUpdate(req.params.postid, req.body, {
        new: true,
    });

    // send response 
    res.status(200).json({
        success: true,
        msg: 'Post updated',
        data: post
    });
});

/*
 *  Endpoint - DELETE api/v1/posts/:postid
 *  Purpose - Deletes an existing post
 *  Access - Private
 */
exports.deletePost = asyncHandler(async (req, res, next) => {

    // find the post to delete
    let post = await Post.findById(req.params.postid);

    if (!post) {
        return next(new ErrorResponse('No post with that id exists', 400));
    }

    if (post.user.toString() !== req.user.id) {
        return next(new ErrorResponse('User is not authorised to delete other user\'s post.', 400));
    }

    // remove the post
    await post.remove();

    // send response 
    res.status(200).json({
        success: true,
        msg: 'Post deleted',
        data: []
    });
});