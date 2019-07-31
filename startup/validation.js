/**
 * Dependencies
 */
const Joi = require('@hapi/joi');

/**
 * Validation
 */
module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi);
}