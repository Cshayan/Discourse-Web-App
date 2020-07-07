/*
 *  Structure of async handler
 */

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Export the function
module.exports = asyncHandler;