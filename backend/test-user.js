const mongoose = require('mongoose');
const User = require('./models/User');

// Before executing the script check the port number and database name
mongoose.connect('mongodb://localhost:27017/Smart_Cubicle')
  .then(async () => {
    console.log('MongoDB connected');


    const newUser = new User({
      username: 'Cha',
      fullName: 'Charlin Infante',
      password: 'P@ssw0rd',
      employee_id: 'TUPM-212-1w245',
      contact_number: '123d425ee6789',
      email: 'dev06@gmail.com',
      role: 'User',
      status: 'Pending', 
      profileImage: '',
      verificationToken: '123456ee789dsew0',
      verified: true, 
    });

    await newUser.save();
    console.log('New user created.');
  })
  .catch(err => console.error('MongoDB connection error:', err));