const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const income = db.get('income');

const schema = Joi.object({
  date: Joi.string().trim().required(), // Date
  amount: Joi.number().required(), // number type
  category: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
});

const router = express.Router();

/*
{
  "date": millseconds,
  "amount": 30000,
  "category": "toy",
  "content": "hi"
}
*/

// const dataset = [{
//   date: '2021-02-23',
//   id: 1,
//   type: 'income',
//   aoumont: 3000,
//   category: 'toy',
//   content: 'lunch'
// },
// {
//   date: '2021-02-24',
//   id: 2,
//   type: 'outcome',
//   aoumont: 3000,
//   category: 'toy',
//   content: 'lunch'
//   payment: 'cash'
// },
// ];

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const items = await income.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// READ One
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await income.findOne({
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
    const inserted = await income.insert(value);
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
    const item = await income.findOne({
      _id: id,
    });

    if (!item) return next();
    await income.update({
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
    await income.remove({ _id: id });
    res.json({
      message: 'Success deleted'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
