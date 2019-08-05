/**
 * Dependencies
 */
const express = require('express');
const router = express.Router();

/**
 * POST
 * 
 * Now, what is the simplest code to write
 * to make our test we created pass?
 */
router.post('/', async (req, res) => {
    if (!req.body.customerId) return res.status(400).send('customerId not provided');
    if (!req.body.movieId) return res.status(400).send('movieId not provided');
    res.status(401).send('Unauthorised');
});

/**
 * Exports
 */
module.exports = router;