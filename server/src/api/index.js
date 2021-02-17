const express = require('express');

const emojis = require('./emojis');
const income = require('./income');
const outcome = require('./outcome');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/income', income);
router.use('/outcome', outcome);

module.exports = router;
