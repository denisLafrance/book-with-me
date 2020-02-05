const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controllers/user')

router.post('/auth', userController.auth);
router.post('/register', userController.register)

module.exports = router;