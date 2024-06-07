const Booking = require('../models/Booking');
const Movie = require('../models/Movie');
const { sendEmail } = require('../utils/emailService');
const { processPayment } = require('../utils/paymentGateway');

exports.bookTickets = async (req, res) => {
    const { movieId, seats, totalPrice, showtime, paymentDetails } = req.body;
    try {
        // Process payment
        const paymentResult = processPayment(paymentDetails);
        if (!paymentResult.success) {
            return res.status(400).json({ msg: 'Payment failed' });
        }

        const booking = new Booking({
            user: req.user.id,
            movie: movieId,
            seats,
            totalPrice,
            showtime
        });
        await booking.save();

        // Send email confirmation
        const user = req.user;
        const movie = await Movie.findById(movieId);

        const emailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Booking Confirmation',
            text: `Hello ${user.name},\n\nYour booking for ${movie.title} is confirmed.\nSeats: ${seats.join(', ')}\nShowtime: ${showtime}\n\nThank you!`
        };

        await sendEmail(emailOptions);

        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('movie', ['title', 'genre']);
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
