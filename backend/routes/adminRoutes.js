const express = require('express');
const { addMovie, updateSeats } = require('../controllers/adminController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/movie', auth, addMovie);
router.post('/seats', auth, updateSeats);

module.exports = router;
