const User = require('../models/User'); 
const Janitor = require('../models/janitor'); 

const copyJanitorsToNewTable = async () => {
  try {
    
    const janitors = await User.find({
      role: 'Janitor',
      status: 'Accepted',
      verified: true,
    });

    if (janitors.length === 0) {
      console.log('No janitors found to copy.');
      return;
    }

    for (const janitor of janitors) {
      const existingJanitor = await Janitor.findOne({ email: janitor.email });
      if (existingJanitor) {
        console.log(`Janitor with email ${janitor.email} already exists in the Janitors table. Skipping...`);
        continue;
      }

      const newJanitor = new Janitor({
        username: janitor.username,
        fullName: janitor.fullName,
        password: janitor.password,
        employeeId: janitor.employeeId,
        contactNumber: janitor.contactNumber,
        email: janitor.email,
        role: janitor.role,
        status: janitor.status,
        profileImage: janitor.profileImage,
        verified: janitor.verified,
      });

      await newJanitor.save();
      console.log(`Janitor ${janitor.username} copied to Janitors table.`);
    }

    console.log('All janitors copied successfully.');
  } catch (error) {
    console.error('Error copying janitors:', error.message);
  }
};

module.exports = copyJanitorsToNewTable;