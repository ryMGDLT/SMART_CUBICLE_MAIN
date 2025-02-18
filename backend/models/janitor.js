const mongoose = require('mongoose');

const janitorSchema = new mongoose.Schema({
  basicDetails: {
    image: { type: String },
    name: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    contact: { type: String, required: true }
  },
  schedule: {
    image: { type: String },
    name: { type: String },
    date: { type: String },
    shift: { type: String },
    timeIn: { type: String },
    timeOut: { type: String },
    cleaningHour: { type: String },
    task: { type: String },
    status: { type: String }
  },
  performanceTrack: {
    image: { type: String },
    name: { type: String },
    today: { type: Number },
    thisWeek: { type: Number },
    thisMonth: { type: Number },
    thisYear: { type: Number },
    status: { type: String },
    employeeId: { type: String }
  },
  resourceUsage: {
    image: { type: String },
    name: { type: String },
    resource: { type: String },
    amountUsed: { type: String },
    remaining: { type: String },
    restocked: { type: String },
    note: { type: String },
    employeeId: { type: String }
  },
  logsReport: {
    image: { type: String },
    name: { type: String },
    date: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    duration: { type: Number },
    task: { type: String },
    beforePicture: { type: String },
    afterPicture: { type: String },
    status: { type: String }
  }
});

const Janitor = mongoose.model('Janitor', janitorSchema);
module.exports = Janitor;