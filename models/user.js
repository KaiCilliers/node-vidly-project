/**
 * Dependencies
 */
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

/**
 * Models with Schemas
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});
/**
 *  Not possible, because an anonymous function has no 'this'
userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
}

IF you create a function that is a part of an object, you should not
use an arrow function
 */
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User', userSchema);

/**
 * Functions
 */
function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}

/**
 * Exports
 */
module.exports.User = User;
module.exports.joiValidate = validateUser;