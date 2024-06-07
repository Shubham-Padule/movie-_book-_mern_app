const Movie = require('../models/Movie');
const Seat = require('../models/Seat');

exports.addMovie = async (req, res) => {
    const { title, genre, showtimes } = req.body;
    try {
        const movie = new Movie({ title, genre, showtimes });
        await movie.save();
        res.json(movie);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.updateSeats = async (req, res) => {
    const { screen, seats } = req.body;
    try {
        let seat = await Seat.findOne({ screen });
        if (!seat) {
            seat = new Seat({ screen, seats });
        } else {
            seat.seats = seats;
        }
        await seat.save();
        res.json(seat);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
