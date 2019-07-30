/**
 * Dependencies
 */
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

/**
 * Model and Schema
 */
const Register = mongoose.model('Register', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 10,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50
    }
}));

/**
 * Functions
 */
function validateRegister(register) {
    const schema = {
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().min(10).max(100).required(),
        password: Joi.string().min(8).max(50).required()
    }
    return Joi.validate(register, schema);
}

  /**
   * Exports
   */
  module.exports.Register = Register;
  module.exports.joiValidate = validateRegister;