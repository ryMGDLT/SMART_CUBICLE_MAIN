require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

// Log environment variables for debugging
console.log('SendGrid API Key:', process.env.SENDGRID_API_KEY);
console.log('From Email:', process.env.FROM_EMAIL);

// Validate SendGrid API Key
if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_API_KEY.startsWith('SG.')) {
    console.error('Invalid SendGrid API Key. Please check your .env file.');
    process.exit(1); 
}

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); 
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); 
    });

// Routes
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});