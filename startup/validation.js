/**
 * Dependencies
 */
const Joi = require('@hapi/joi');

/**
 * Validation
 * 
 * TODO double-check why this is used
 */
module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi);
}