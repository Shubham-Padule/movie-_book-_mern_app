const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const authMiddleware = require('./middlewares/authMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Load environment variables
require('dotenv').config();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(bodyParser.json());


// Apply authentication middleware to protected routes
app.use('/api/bookings', authMiddleware);
app.use('/api/admin', authMiddleware);

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/seats', require('./routes/seatRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Error Handling Middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
