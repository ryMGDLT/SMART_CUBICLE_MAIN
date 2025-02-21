const copyJanitorsToNewTable = require('../utils/copyJanitors');

(async () => {
  await copyJanitorsToNewTable();
  console.log('Test completed.');
})();