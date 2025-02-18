const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:6969/Smart_Cubicle')
  .then(async () => {
    console.log('MongoDB connected');

   
    await User.findOneAndUpdate(
      { email: 'pakukaba1@gmail.com' },
      { verified: true }
    );

    console.log('User updated.');
  })
  .catch(err => console.error('MongoDB connection error:', err));