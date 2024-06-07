const Seat = require('../models/Seat');

exports.getSeats = async (req, res) => {
    try {
        const seats = await Seat.find();
        res.json(seats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.lockSeats = async (req, res) => {
    // Implement logic to lock seats temporarily
};

exports.releaseSeats = async (req, res) => {
    // Implement logic to release locked seats after a timeout
};
