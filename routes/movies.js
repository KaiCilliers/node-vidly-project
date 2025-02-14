/**
 * Dependencies
 */
const {Movie, joiValidate} = require('../models/movie'); 
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();
const validateBody = require('../middleware/validate');

/**
 * GET
 */
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

/**
 * POST
 */
router.post('/', validateBody(joiValidate), async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = new Movie({ 
    title: req.body.title,
    genre: {
        _id: genre._id,
        name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  await movie.save();
  res.send(movie);
});

/**
 * PUT
 */
router.put('/:id', validateBody(joiValidate), async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(req.params.id,{ 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

/**
 * DELETE
 */
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

 /**
  * Exports
  */
 module.exports = router;