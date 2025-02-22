const mongoose = require('mongoose');
const User = require('../models/user'); 

mongoose.connect('mongodb://localhost:6969/Smart_Cubicle');

async function syncJanitors() {
  try {
    await User.syncAllJanitors();
    const janitors = await Janitor.find({});
    console.log(`Total janitors in Janitor collection: ${janitors.length}`);
    janitors.forEach(j => console.log(`Janitor: ${j.basicDetails.name}, Email: ${j.basicDetails.email}`));
  } catch (error) {
    console.error('Sync failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

syncJanitors();