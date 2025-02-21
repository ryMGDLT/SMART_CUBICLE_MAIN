function getIPAddress() {
    const interfaces = require('os').networkInterfaces();
    console.log('Network interfaces:', Object.keys(interfaces));

    for (const interfaceName in interfaces) {
        const iface = interfaces[interfaceName];        
        for (const alias of iface) {
            console.log(`Address found: ${alias.address}, Family: ${alias.family}, Internal: ${alias.internal}`);
            if (alias.family === 'IPv4' && !alias.internal) {
                console.log(`Local IP address found: ${alias.address}`);
                return alias.address;
            }
        }
    }
    console.log('No external IPv4 address found, falling back to localhost');
    return '127.0.0.1';
}

// Get the port for the backend server
function getPortBackend() {
    return process.env.PORT || 5000; // Fallback to port 5000 if not specified (5000 port if for backend)
}

// Get the port for the frontend server
function getPortFrontend() {
    return process.env.PORT_FRONT || 3000; // Fallback to port 3000 if not specified (3000 port if for frontend)
}
module.exports = { getIPAddress, getPortBackend, getPortFrontend };
