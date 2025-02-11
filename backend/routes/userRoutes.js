const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', userController.createUser); // Signup route
router.post('/login', userController.loginUser);  // Login route
router.post('/verify-email', userController.verifyEmail); // Verify email route
router.post('/resend-verification-email', userController.resendVerificationEmail); // Resend verification email

// Protected routes (require authentication)
router.get('/', authMiddleware, userController.getAllUsers);      // Fetch all users
router.get('/:id', authMiddleware, userController.getUserById);   // Fetch user by ID
router.put('/:id', authMiddleware, userController.updateUser);    // Update user by ID
router.delete('/:id', authMiddleware, userController.deleteUser); // Delete user by ID

module.exports = router;