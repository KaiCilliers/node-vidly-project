/**
 * Dependencies
 */
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

/**
 * Models with Schemas
 */
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Genre = mongoose.model('Genre', genreSchema);

/**
 * Functions
 * 
 * Validate data provided by client
 */
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(genre, schema);
}

/**
 * Exports
 */
module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.joiValidate = validateGenre;