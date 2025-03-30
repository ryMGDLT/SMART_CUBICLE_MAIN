const jwt = require('jsonwebtoken');

const preventAuthAccess = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next();
        }

       
        return res.redirect('/dashboard');
    });
};

module.exports = preventAuthAccess;