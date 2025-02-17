const mongoose = require('mongoose');

const janitorSchema = new mongoose.Schema({
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
  role: { type: String, default: 'Janitor' },
  status: { type: String, default: 'Accepted' },
  profileImage: { type: String, default: "" },
  verified: { type: Boolean, default: true },
});

const Janitor = mongoose.model('Janitor', janitorSchema);
module.exports = Janitor;