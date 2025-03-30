const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { janitorSchema } = require("./Janitor");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, trim: true },
  fullName: { type: String, required: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^TUPM-\d{2}-\d{4}$/, "Employee ID must follow the format TUPM-XX-XXXX (e.g., TUPM-21-1234)"],
  },
  contactNumber: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
  },
  role: { type: String, enum: ["Admin", "User", "Janitor", "Superadmin"], default: "User" },
  status: { type: String, enum: ["Pending", "Accepted", "Declined"], default: "Pending" },
  profileImage: { type: String, default: "" },
  verificationToken: { type: String, unique: true, sparse: true },
  verificationTokenExpiresAt: Date,
  verified: { type: Boolean, default: false },
  notificationsEnabled: { type: Boolean, default: true },
}, { timestamps: true });

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Sync to Janitor collection on save
userSchema.post("save", async function (doc) {
  try {
    const JanitorLocal = global.dbConnections.local.model("Janitor", janitorSchema);
    const JanitorAtlas = global.dbConnections.atlas.model("Janitor", janitorSchema);

    if (doc.role === "Janitor" && doc.status === "Accepted" && doc.verified === true) {
      for (const JanitorModel of [JanitorLocal, JanitorAtlas]) {
        const existingJanitor = await JanitorModel.findOne({ userId: doc._id });
        if (!existingJanitor) {
          const newJanitor = new JanitorModel({
            userId: doc._id,
            basicDetails: {
              image: doc.profileImage,
              name: doc.fullName,
              employeeId: doc.employeeId,
              email: doc.email,
              contact: doc.contactNumber,
            },
            schedule: [],
            performanceTrack: [],
            resourceUsage: [],
            logsReport: [],
          });
          await newJanitor.save();
          console.log(`User ${doc.username} (userId: ${doc._id}) copied to Janitors table in ${JanitorModel.collection.name}.`);
        } else {
          console.log(`User ${doc.username} (userId: ${doc._id}) already exists in Janitors table in ${JanitorModel.collection.name}.`);
        }
      }
    } else {
      console.log(`User ${doc.username} (userId: ${doc._id}) does not qualify: role=${doc.role}, status=${doc.status}, verified=${doc.verified}`);
    }
  } catch (error) {
    console.error(`Error copying user ${doc.username} to Janitors table:`, error.message);
  }
});

// Sync to Janitor collection on update
userSchema.post("findOneAndUpdate", async function () {
  try {
    const updatedUser = await this.model.findOne(this.getQuery());
    const JanitorLocal = global.dbConnections.local.model("Janitor", janitorSchema);
    const JanitorAtlas = global.dbConnections.atlas.model("Janitor", janitorSchema);

    if (
      updatedUser.role === "Janitor" &&
      updatedUser.status === "Accepted" &&
      updatedUser.verified === true
    ) {
      for (const JanitorModel of [JanitorLocal, JanitorAtlas]) {
        const existingJanitor = await JanitorModel.findOne({ userId: updatedUser._id });
        if (existingJanitor) {
          existingJanitor.basicDetails.image = updatedUser.profileImage || existingJanitor.basicDetails.image;
          existingJanitor.basicDetails.name = updatedUser.fullName;
          existingJanitor.basicDetails.employeeId = updatedUser.employeeId;
          existingJanitor.basicDetails.email = updatedUser.email;
          existingJanitor.basicDetails.contact = updatedUser.contactNumber;

          if (existingJanitor.schedule && existingJanitor.schedule.length > 0) {
            existingJanitor.schedule.forEach((entry) => {
              entry.image = updatedUser.profileImage || entry.image;
              entry.name = updatedUser.fullName;
            });
          }
          if (existingJanitor.performanceTrack && existingJanitor.performanceTrack.length > 0) {
            existingJanitor.performanceTrack.forEach((entry) => {
              entry.image = updatedUser.profileImage || entry.image;
              entry.employeeId = updatedUser.employeeId;
              entry.name = updatedUser.fullName;
            });
          }
          if (existingJanitor.resourceUsage && existingJanitor.resourceUsage.length > 0) {
            existingJanitor.resourceUsage.forEach((entry) => {
              entry.image = updatedUser.profileImage || entry.image;
              entry.employeeId = updatedUser.employeeId;
              entry.name = updatedUser.fullName;
            });
          }
          if (existingJanitor.logsReport && existingJanitor.logsReport.length > 0) {
            existingJanitor.logsReport.forEach((entry) => {
              entry.image = updatedUser.profileImage || entry.image;
              entry.name = updatedUser.fullName;
            });
          }

          existingJanitor.markModified("schedule");
          existingJanitor.markModified("performanceTrack");
          existingJanitor.markModified("resourceUsage");
          existingJanitor.markModified("logsReport");

          await existingJanitor.save();
          console.log(`Janitor with userId: ${updatedUser._id} updated in ${JanitorModel.collection.name}.`);
        } else {
          const newJanitor = new JanitorModel({
            userId: updatedUser._id,
            basicDetails: {
              image: updatedUser.profileImage,
              name: updatedUser.fullName,
              employeeId: updatedUser.employeeId,
              email: updatedUser.email,
              contact: updatedUser.contactNumber,
            },
            schedule: [],
            performanceTrack: [],
            resourceUsage: [],
            logsReport: [],
          });
          await newJanitor.save();
          console.log(`New janitor with userId: ${updatedUser._id} added to ${JanitorModel.collection.name}.`);
        }
      }
    } else {
      console.log(`Updated user ${updatedUser.username} (userId: ${updatedUser._id}) does not qualify: role=${updatedUser.role}, status=${updatedUser.status}, verified=${updatedUser.verified}`);
    }
  } catch (error) {
    console.error("Error handling user update:", error.message);
  }
});

// Sync all janitors static method
userSchema.statics.syncAllJanitors = async function () {
  try {
    const JanitorLocal = global.dbConnections.local.model("Janitor", janitorSchema);
    const JanitorAtlas = global.dbConnections.atlas.model("Janitor", janitorSchema);
    const janitorUsers = await this.find({
      role: "Janitor",
      status: "Accepted",
      verified: true,
    });
    console.log(`Found ${janitorUsers.length} qualifying janitors in User collection.`);

    for (const user of janitorUsers) {
      for (const JanitorModel of [JanitorLocal, JanitorAtlas]) {
        try {
          const existingJanitor = await JanitorModel.findOne({ "basicDetails.email": user.email });
          if (!existingJanitor) {
            const newJanitor = new JanitorModel({
              userId: user._id,
              basicDetails: {
                image: user.profileImage,
                name: user.fullName,
                employeeId: user.employeeId,
                email: user.email,
                contact: user.contactNumber,
              },
              schedule: [],
              performanceTrack: [],
              resourceUsage: [],
              logsReport: [],
            });
            await newJanitor.save();
            console.log(`User ${user.username} (email: ${user.email}) copied to Janitors table via sync in ${JanitorModel.collection.name}.`);
          } else {
            console.log(`User ${user.username} (email: ${user.email}) already exists in Janitors table in ${JanitorModel.collection.name}.`);
            let updated = false;
            if (existingJanitor.basicDetails.image !== user.profileImage) {
              existingJanitor.basicDetails.image = user.profileImage;
              updated = true;
            }
            if (existingJanitor.basicDetails.name !== user.fullName) {
              existingJanitor.basicDetails.name = user.fullName;
              updated = true;
            }
            if (existingJanitor.basicDetails.employeeId !== user.employeeId) {
              existingJanitor.basicDetails.employeeId = user.employeeId;
              updated = true;
            }
            if (existingJanitor.basicDetails.email !== user.email) {
              existingJanitor.basicDetails.email = user.email;
              updated = true;
            }
            if (existingJanitor.basicDetails.contact !== user.contactNumber) {
              existingJanitor.basicDetails.contact = user.contactNumber;
              updated = true;
            }
            if (updated) {
              await existingJanitor.save();
              console.log(`Janitor ${user.username} (email: ${user.email}) updated in Janitors table via sync in ${JanitorModel.collection.name}.`);
            }
          }
        } catch (error) {
          console.error(`Error syncing user ${user.username} (email: ${user.email}) in ${JanitorModel.collection.name}:`, error.message);
        }
      }
    }
    console.log("Janitor sync completed.");
  } catch (error) {
    console.error("Error in syncAllJanitors:", error.message);
  }
};

const getUserModels = () => {
  if (!global.dbConnections) {
    throw new Error("Database connections not initialized");
  }
  const UserLocal = global.dbConnections.local.model("User", userSchema);
  const UserAtlas = global.dbConnections.atlas.model("User", userSchema);
  return { UserLocal, UserAtlas };
};

module.exports = getUserModels;