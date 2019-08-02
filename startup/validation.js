/**
 * Dependencies
 */
const Joi = require('@hapi/joi');

/**
 * Validation
 * 
 * Validates any objectID's sent to the server.
 * Placed here because this is a very common
 * operation to be used in multiple routes
 */
module.exports = function() {
    Joi.objectId = require('joi-objectid')(Joi);
}