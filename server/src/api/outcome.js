const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const outcome = db.get('outcome');

const schema = Joi.object({
  date: Joi.string().trim().required(), // Date
  amount: Joi.number().required(), // number type
  category: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
  payment: Joi.string().trim().required(),
});

const router = express.Router();

/*
{
  "date": "2020/03/16",
  "amount": 30000,
  "category": "toy",
  "content": "hi",
  "payment": "credit"
}
*/

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const items = await outcome.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// READ One
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await outcome.findOne({
      _id: id,
    });

    if (!item) return next();
    return res.json(item);
  } catch (error) {
    next(error);
  }
});

// Create One
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const value = await schema.validateAsync(req.body);
    const inserted = await outcome.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// Update One
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await schema.validateAsync(req.body);
    const item = await outcome.findOne({
      _id: id,
    });

    if (!item) return next();
    await outcome.update({
      _id: id,
    }, {
      $set: value
    });
    res.json(value);
  } catch (error) {
    next(error);
  }
});

// Delete One
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await outcome.remove({ _id: id });
    res.json({
      message: 'Success deleted'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
