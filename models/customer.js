/**
 * Dependencies
 */
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

/**
 * Model
 */
const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

/**
 * Functions
 */
function validateCustomer(customer) {
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().min(4).max(50).required(),
        phone: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(customer, schema);
}

/**
 * Export
 */
module.exports.Customer = Customer;
module.exports.joiValidate = validateCustomer;