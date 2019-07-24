/**
 * Dependencies
 */
const Joi = require('@hapi/joi');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

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
}))

/**
 * GET
 */
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Genre with provided ID not found');
    res.send(customer);
});

/**
 * POST
 */
router.post('/', async (req, res) => {
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    customer = await customer.save();

    res.send(customer);
});

/**
 * PUT
 */
router.put('/:id', async (req, res) => {
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold || false,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });

    if (!customer) return res.status(404).send('Customer with provided ID not found');

    res.send(customer);
});

/**
 * DELETE
 */
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('Customer with provided ID not found');
    res.send(customer);
});

/**
 * Functions
 */
function joiValidate(customer) {
    const schema = {
        isGold: Joi.boolean(), // not required because there is a default value assigned
        name: Joi.string().min(4).max(50).required(),
        phone: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(customer, schema);
}

/**
 * Exports
 */
module.exports = router;