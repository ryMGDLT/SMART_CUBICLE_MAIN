const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:6969/Smart_Cubicle', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
    mongoose.connection.close(); 
  })
  .catch(err => console.error('MongoDB connection error:', err));