const express = require('express');
const { getSeats, lockSeats, releaseSeats } = require('../controllers/seatController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getSeats);
router.post('/lock', auth, lockSeats);
router.post('/release', auth, releaseSeats);

module.exports = router;
