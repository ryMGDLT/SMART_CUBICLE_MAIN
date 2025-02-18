const jwt = require('jsonwebtoken');

const ERRORS = {
    INVALID_AUTH_HEADER: 'Invalid Authorization header format. Expected "Bearer <token>".',
    NO_TOKEN_PROVIDED: 'Access denied. No token provided.',
    TOKEN_EXPIRED: 'Token expired. Please log in again.',
    INVALID_TOKEN: 'Invalid token.',
    UNEXPECTED_ERROR: 'An unexpected error occurred.',
};

const validateAuthHeader = (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error(ERRORS.INVALID_AUTH_HEADER);
    }
    const token = authHeader.split(' ')[1];
    if (!token || token.trim() === '') {
        throw new Error(ERRORS.NO_TOKEN_PROVIDED);
    }
    return token;
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error(ERRORS.TOKEN_EXPIRED);
        }
        if (error.name === 'JsonWebTokenError' || error.name === 'NotBeforeError') {
            throw new Error(ERRORS.INVALID_TOKEN);
        }
        throw new Error(ERRORS.UNEXPECTED_ERROR);
    }
};

module.exports = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        const token = validateAuthHeader(authHeader);
        const decoded = verifyToken(token);

        req.user = {
            id: decoded.id,
            role: decoded.role,
            exp: decoded.exp,
        };
        req.token = token; 

        if (process.env.NODE_ENV === 'development') {
            console.debug("Decoded token:", decoded);
        }

        next();
    } catch (error) {
        console.error(error.message);
        return res.status(error.message === ERRORS.NO_TOKEN_PROVIDED ? 401 : 400).json({ message: error.message });
    }
};

{/*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
*/}