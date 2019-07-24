/**
 * Dependencies
 */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/**
 * Model
 */
const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: Boolean,
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
    res.send(await Customer.find().sort('name'));
});
router.get('/:id', async (req, res) => {
    res.send(await Customer.find({ _id: req.params.id}));
});

/**
 * POST
 */
router.post('/', async (req, res) => {
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
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });
    res.send(customer);
});

/**
 * DELETE
 */
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    res.send(customer);
});

/**
 * Exports
 */
module.exports = router;