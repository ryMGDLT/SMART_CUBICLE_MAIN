const { UserLocal, UserAtlas } = require("./models/User");

async function migrateUsers() {
  await UserLocal.updateMany(
    { notificationsEnabled: { $exists: false } },
    { $set: { notificationsEnabled: true } }
  );
  await UserAtlas.updateMany(
    { notificationsEnabled: { $exists: false } },
    { $set: { notificationsEnabled: true } }
  );
  console.log("User migration complete: notificationsEnabled added.");
}

migrateUsers().catch(console.error);