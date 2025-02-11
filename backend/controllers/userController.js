const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/emailService');

// Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Validate email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate password strength
const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// Generate verification token
const generateVerificationToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Create user
exports.createUser = async (req, res) => {
    try {
        const { username, password, confirmPassword, employee_id, contact_number, email, role } = req.body;

        // Validate required fields
        if (!username || !password || !confirmPassword || !employee_id || !contact_number || !email || !role) {
            return res.status(400).send('All fields are required');
        }

        // Validate email
        if (!isValidEmail(email)) {
            return res.status(400).send('Invalid email address');
        }

        // Check if passwords match
        if (password.trim() !== confirmPassword.trim()) {
            return res.status(400).send('Passwords do not match');
        }

        // Check if password is strong enough
        if (!isStrongPassword(password.trim())) {
            return res.status(400).send('Password is not strong enough.');
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        // Generate verification token
        const verificationToken = generateVerificationToken();

        // Create a new user
        const newUser = new User({
            username,
            password: await bcrypt.hash(password.trim(), 10), 
            employee_id,
            contact_number,
            email,
            role,
            verificationToken,
            verified: false,
        });

        await newUser.save();

        // Send verification email
        const verificationLink = `http://192.168.8.181:3000/verify-email?token=${verificationToken}`;
        const subject = 'Verify Your Email';
        const text = `Hi ${username},\n\nPlease verify your email by clicking the following link: ${verificationLink}\n\nBest regards,\nThe Team`;
        await sendEmail(email, subject, text);

        res.status(201).json({ message: 'User created successfully. Please check your email to verify your account.' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if the user's email is verified
        if (!user.verified) {
            return res.status(403).send('Email not verified. Please verify your email before logging in.');
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password.trim(), user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Generate JWT
        const token = generateToken(user);

        // Send success response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Verify email
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;

        // Find the user by verification token
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).send('Invalid or expired token');
        }

        // Mark the user as verified
        user.verified = true;
        user.verificationToken = undefined; 
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
// Resend verification email
exports.resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if the user's email is already verified
        if (user.verified) {
            return res.status(400).send('Email is already verified.');
        }

        // Generate a new verification token
        const verificationToken = generateVerificationToken();

        // Update the user's verification token
        user.verificationToken = verificationToken;
        await user.save();

        // Send verification email
        const verificationLink = `http://192.168.8.181:3000/verify-email?token=${verificationToken}`;
        const subject = 'Verify Your Email';
        const text = `Hi ${user.username},\n\nPlease verify your email by clicking the following link: ${verificationLink}\n\nBest regards,\nThe Team`;
        await sendEmail(email, subject, text);

        res.status(200).json({ message: 'Verification email resent successfully.' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const { password, ...updateData } = req.body; 

        if (password) {
            updateData.password = await bcrypt.hash(password.trim(), 10);
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};