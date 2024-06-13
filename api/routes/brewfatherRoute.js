const express = require('express');
const router = express.Router();
const brewfatherController = require('../controllers/brewfatherController');

router.get('/', brewfatherController);

module.exports = router;
