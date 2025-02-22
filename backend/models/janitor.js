const mongoose = require('mongoose');
//janitor from users
const janitorSchema = new mongoose.Schema({
  basicDetails: {
    image: { type: String, default: "" },
    name: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
  },
  //made an array to store multiple entry under one basicdetails
  schedule: [{
    image: { type: String },
    name: { type: String },
    date: { type: String },
    shift: { type: String },
    timeIn: { type: String },
    timeOut: { type: String },
    cleaningHour: { type: String },
    task: { type: String },
    status: { type: String },
  }],
  //made an array to store multiple entry under one basicdetails
  performanceTrack: [{
    image: { type: String },
    name: { type: String },
    today: { type: Number },
    thisWeek: { type: Number },
    thisMonth: { type: Number },
    thisYear: { type: Number },
    maxCleaningHour: { type: Number },
    minCleaningHour: { type: Number },
    status: { type: String },
    employeeId: { type: String },
  }],
  //made an array to store multiple entry under one basicdetails
  resourceUsage: [{
    image: { type: String },
    name: { type: String },
    resource: { type: String },
    amountUsed: { type: String },
    remaining: { type: String },
    restocked: { type: String },
    note: { type: String },
    employeeId: { type: String },
  }],
  //made an array to store multiple entry under one basicdetails
  logsReport: [{
    image: { type: String },
    name: { type: String },
    date: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    duration: { type: Number },
    task: { type: String },
    beforePicture: { type: String },
    afterPicture: { type: String },
    status: { type: String },
  }],
});

const Janitor = mongoose.model('Janitor', janitorSchema);
module.exports = Janitor;