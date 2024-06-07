const express = require('express');
const { bookTickets, getBookings } = require('../controllers/bookingController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/book', auth, bookTickets);
router.get('/bookings', auth, getBookings);

module.exports = router;
