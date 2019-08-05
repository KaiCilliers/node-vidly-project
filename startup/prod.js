/**
 * Dependencies
 */
// Protects application from basic web vulnerabilities
const helmet = require('helmet')
// Compresses http response sent to client
const compression = require('compression')

/**
 * Exports
 */
module.exports = function(app) {
    app.use(hemlet());
    app.use(compression());
}