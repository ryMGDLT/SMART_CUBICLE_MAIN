const mongoose = require('mongoose');
const User = require('../models/user');
const Janitor = require('../models/janitor');
//to add userid in the janitor collection for refference
async function migrateJanitorUserIds() {
  try {
    await mongoose.connect('mongodb://localhost:6969/Smart_Cubicle', { useNewUrlParser: true, useUnifiedTopology: true });

    const janitors = await Janitor.find({ userId: { $exists: false } });
    console.log(`Found ${janitors.length} Janitors without userId.`);

    for (const janitor of janitors) {
      const user = await User.findOne({
        $or: [
          { email: janitor.basicDetails.email },
          { employeeId: janitor.basicDetails.employeeId },
        ],
      });

      if (user) {
        janitor.userId = user._id;
        await janitor.save();
        console.log(`Updated Janitor with email: ${janitor.basicDetails.email} to include userId: ${user._id}`);
      } else {
        console.warn(`No matching User found for Janitor with email: ${janitor.basicDetails.email} and employeeId: ${janitor.basicDetails.employeeId}`);
      }
    }

    console.log('Migration completed.');
  } catch (error) {
    console.error('Error during migration:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

migrateJanitorUserIds();