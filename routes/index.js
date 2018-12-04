const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'jnSearch' });
});

router.get('search', (req, res) => {
  res.render('search')
})

module.exports = router;
