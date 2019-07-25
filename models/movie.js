/**
 * Dependencies
 */
const mongoose = require('mongoose');

/**
 * Schema and Model
 */
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: genreSchema,
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
}));

/**
 * Exports
 */
module.exports.Movie = Movie;