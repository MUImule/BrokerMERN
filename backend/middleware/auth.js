const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

// Check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    // Make sure the token exists
    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();

    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
};

// Middleware for admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 1) {
        return next(new ErrorResponse('Access denied, you must be an admin', 401));
    }
    next();
};

// Middleware for employers
exports.isEmployer = (req, res, next) => {
    if (req.user.role !== 2) {
        return next(new ErrorResponse('Access denied, you must be an employer', 401));
    }
    next();
};
