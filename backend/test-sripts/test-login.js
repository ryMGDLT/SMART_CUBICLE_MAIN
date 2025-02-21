const bcrypt = require('bcrypt');

const password = "P@ssw0rd"; 
const storedHash = "$2b$10$BFj3Cu.iLfZuhZjB6UhvfugMf/WlB.504oNvIP6qY2Tup3p5iRBO6"; 

bcrypt.compare(password, storedHash, (err, result) => {
    if (err) {
        console.error("Error comparing passwords:", err);
    } else {
        console.log("Manual comparison result:", result); 
    }
});