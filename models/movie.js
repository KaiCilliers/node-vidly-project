/**
 * Dependencies
 */
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

/**
 * Models with Schemas
 */
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    }
}));

/**
 * Functions
 */
function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(4).required()
    };
    return Joi.validate(movie, schema);
}

/**
 * Exports
 */
module.exports.Movie = Movie;
// module.exports.joiValidate = validateGenre;