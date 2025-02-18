const mongoose = require('mongoose');
const cron = require('node-cron');
const copyJanitorsToNewTable = require('./utils/copyJanitors');


mongoose.connect('mongodb://localhost:6969/Smart_Cubicle')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


cron.schedule('* * * * *', async () => {
  console.log('Running the janitor copy task...');
  try {
    await copyJanitorsToNewTable();
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
});

console.log('Cron job scheduled to run every minute.');