const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.createAuth);
router.get('/', authController.getAuth);
router.delete('/', authController.deleteAuth);

module.exports = router;
