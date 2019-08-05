/**
 * Dependencies
 */
const mongoose = require('mongoose');

/**
 * Validate and ObjectId
 */
module.exports = function(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID');
    next();
}