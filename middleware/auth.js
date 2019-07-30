/**
 * Dependencies
 */
const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * Functions
 */
module.exports = function auth(req, res, next) {
    // Check if user has necessary authentication else send 401 (auth error)
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    try {
        // get the decoded payload, throws exception if token not valid
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}

/**
 * Exports (replacable as seen above)
 */
// module.exports = auth;