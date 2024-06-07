const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
    screen: { type: Number, required: true },
    seats: [{ type: String, required: true }],
});

module.exports = mongoose.model('Seat', SeatSchema , 'seatdeta');
