/**
 * Dependencies
 */
const express = require('express');
const router = express.Router();
const {Customer, joiValidate} = require('../models/customer');
const validateBody = require('../middleware/validate');

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
router.post('/', validateBody(joiValidate), async (req, res) => {
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
router.put('/:id', validateBody(joiValidate), async (req, res) => {
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
 * Exports
 */
module.exports = router;