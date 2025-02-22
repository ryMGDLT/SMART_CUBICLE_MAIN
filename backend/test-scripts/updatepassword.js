const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

const User = require('../models/User');

async function updatePassword(email, newPassword) {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log("New hashed password:", hashedPassword);

        const result = await User.updateOne(
            { email: email },
            { password: hashedPassword }
        );

        console.log("Update result:", result);
        if (result.matchedCount === 0) {
            console.log("No user found with the email:", email);
        } else {
            console.log("Password updated successfully for email:", email);
        }
    } catch (error) {
        console.error("Error updating password:", error.message);
    } finally {
        mongoose.connection.close();
    }
}

const email = "janitor02@gmail.com";
const newPassword = "P@ssw0rd";

updatePassword(email, newPassword);