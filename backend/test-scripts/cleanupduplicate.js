async function cleanDuplicateJanitors() {
    try {
      const janitors = await Janitor.aggregate([
        {
          $group: {
            _id: "$userId",
            docs: { $push: "$$ROOT" },
            count: { $sum: 1 },
          },
        },
        {
          $match: {
            count: { $gt: 1 },
          },
        },
      ]);
  
      for (const group of janitors) {
        const duplicates = group.docs;
        console.log(`Found ${duplicates.length} duplicates for userId: ${group._id}`);
  
     
        const toKeep = duplicates.sort((a, b) => b._id.getTimestamp() - a._id.getTimestamp())[0];
        const toDelete = duplicates.filter(doc => doc._id.toString() !== toKeep._id.toString());
  
        for (const doc of toDelete) {
          await Janitor.findByIdAndDelete(doc._id);
          console.log(`Deleted duplicate janitor with _id: ${doc._id}`);
        }
      }
      console.log('Duplicate cleanup completed.');
    } catch (error) {
      console.error('Error cleaning duplicates:', error.message);
    }
  }