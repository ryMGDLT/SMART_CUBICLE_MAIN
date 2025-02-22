const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Janitor = require('./janitor');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, trim: true },
  fullName: { type: String, required: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^TUPM-\d{2}-\d{4}$/, "Employee ID must follow the format TUPM-XX-XXXX (e.g., TUPM-21-1234)"],
  },
  contactNumber: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
  },
  role: { type: String, enum: ['Admin', 'User', 'Janitor', 'Superadmin'], default: 'User' },
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
    if (doc.role === 'Janitor' && doc.status === 'Accepted' && doc.verified === true) {
      const existingJanitor = await Janitor.findOne({ email: doc.email });
      if (!existingJanitor) {
        const newJanitor = new Janitor({
          username: doc.username,
          fullName: doc.fullName,
          password: doc.password,
          employeeId: doc.employeeId,
          contactNumber: doc.contactNumber,
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
    const updatedUser = await this.model.findOne(this.getQuery());
    if (
      updatedUser.role === 'Janitor' &&
      updatedUser.status === 'Accepted' &&
      updatedUser.verified === true
    ) {
      const existingJanitor = await Janitor.findOne({ email: updatedUser.email });
      if (existingJanitor) {
        existingJanitor.username = updatedUser.username;
        existingJanitor.fullName = updatedUser.fullName;
        existingJanitor.contactNumber = updatedUser.contactNumber;
        existingJanitor.email = updatedUser.email;
        existingJanitor.employeeId = updatedUser.employeeId;
        existingJanitor.profileImage = updatedUser.profileImage;
        existingJanitor.verified = updatedUser.verified;
        await existingJanitor.save();
        console.log(`Janitor ${updatedUser.username} updated in Janitors table.`);
      } else {
        const newJanitor = new Janitor({
          username: updatedUser.username,
          fullName: updatedUser.fullName,
          password: updatedUser.password,
          employeeId: updatedUser.employeeId,
          contactNumber: updatedUser.contactNumber,
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