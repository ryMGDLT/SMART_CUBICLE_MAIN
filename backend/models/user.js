const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Janitor = require('./janitor'); 

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    employee_id: { type: String, required: true, unique: true, trim: true },
    contact_number: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    role: { type: String, enum: ['Admin', 'User', 'Janitor'], default: 'User' }, 
    status: { type: String, enum: ['Pending', 'Accepted', 'Declined'], default: 'Pending' }, 
    profileImage: { type: String, default: "" },
    verificationToken: { type: String, unique: true, sparse: true },
    verificationTokenExpiresAt: Date,
    verified: { type: Boolean, default: false },
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Post-save hook to copy users to the Janitor collection
userSchema.post('save', async function (doc) {
    try {
        // Users criteria for being a janitor
        if (
            doc.role === 'Janitor' &&
            doc.status === 'Accepted' &&
            doc.verified === true
        ) {
            const existingJanitor = await Janitor.findOne({ email: doc.email });
            if (!existingJanitor) {
                const newJanitor = new Janitor({
                    username: doc.username,
                    fullName: doc.fullName,
                    password: doc.password,
                    employee_id: doc.employee_id,
                    contact_number: doc.contact_number,
                    email: doc.email,
                    role: doc.role,
                    status: doc.status,
                    profileImage: doc.profileImage,
                    verified: doc.verified,
                });

                await newJanitor.save();
                console.log(`User ${doc.username} copied to Janitors table.`);
            } else {
                console.log(`User ${doc.username} already exists in the Janitors table.`);
            }
        }
    } catch (error) {
        console.error('Error copying user to Janitors table:', error.message);
    }
});

// Post-update hook to handle updates to eligible users
userSchema.post('findOneAndUpdate', async function () {
    try {
        // Fetch the updated user document
        const updatedUser = await this.model.findOne(this.getQuery());

        // Check if the user meets the criteria for being a janitor
        if (
            updatedUser.role === 'Janitor' &&
            updatedUser.status === 'Accepted' &&
            updatedUser.verified === true
        ) {
            // Find the corresponding janitor document
            const existingJanitor = await Janitor.findOne({ email: updatedUser.email });

            if (existingJanitor) {
                // Update the janitor document with the latest user details
                existingJanitor.username = updatedUser.username;
                existingJanitor.fullName = updatedUser.fullName;
                existingJanitor.contact_number = updatedUser.contact_number;
                existingJanitor.email = updatedUser.email;
                existingJanitor.employee_id = updatedUser.employee_id;
                existingJanitor.profileImage = updatedUser.profileImage;
                existingJanitor.verified = updatedUser.verified;

                await existingJanitor.save();
                console.log(`Janitor ${updatedUser.username} updated in Janitors table.`);
            } else {
                // If no corresponding janitor document exists, create a new one
                const newJanitor = new Janitor({
                    username: updatedUser.username,
                    fullName: updatedUser.fullName,
                    password: updatedUser.password,
                    employee_id: updatedUser.employee_id,
                    contact_number: updatedUser.contact_number,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    status: updatedUser.status,
                    profileImage: updatedUser.profileImage,
                    verified: updatedUser.verified,
                });

                await newJanitor.save();
                console.log(`New janitor ${updatedUser.username} added to Janitors table.`);
            }
        }
    } catch (error) {
        console.error('Error handling user update:', error.message);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;