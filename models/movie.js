/**
 * Dependencies
 */
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

/**
 * Model and Schema
 */
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

/**
 * Functions
 * 
 * Validate data provided by client
 */
function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema);
}

/**
 * Exports
 */
module.exports.Movie = Movie;
module.exports.joiValidate = validateMovie;