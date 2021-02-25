const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const account = db.get('account');

/* income
{
  "date": millseconds,
  "amount": 30000,
  "category": "toy",
  "content": "hi"
}
*/

/* outcome
{
  "date": millseconds,
  "amount": -30000,
  "category": "toy",
  "content": "hi",
  "payment": "credit"
}
*/

// const dataset = [{
//   date: '2021-02-23',
//   _id: 1,
//   type: 'income',
//   amount: 3000,
//   category: 'toy',
//   content: 'lunch'
// },
// {
//   date: '2021-02-24',
//   _id: 2,
//   type: 'outcome',
//   aoumont: -3000,
//   category: 'toy',
//   content: 'lunch'
//   payment: 'cash'
// },
// ];

const schema = Joi.object({
  date: Joi.string().trim().required(), // Date
  type: Joi.string().trim().required(),
  amount: Joi.number().required(), // number type
  category: Joi.string().trim().required(),
  content: Joi.string().trim().allow(null),
  payment: Joi.string().trim(),
});

const router = express.Router();

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const items = await account.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// READ One
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await account.findOne({
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
    const inserted = await account.insert(value);
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
    const item = await account.findOne({
      _id: id,
    });

    if (!item) return next();
    await account.update({
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
    await account.remove({ _id: id });
    res.json({
      message: 'Success deleted'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
