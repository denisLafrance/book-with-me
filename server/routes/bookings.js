const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking');
const UserController = require('../controllers/user');

router.post('', UserController.authMiddleware, bookingController.createBooking);


module.exports = router;