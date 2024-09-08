const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');


dotenv.config();
connectDB();


const userRoutes = require('./src/routes/userRoutes');
const bookRoutes = require('./src/routes/bookRoutes');
const transactionRoutes = require('./src/routes/tranctionRoutes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());



// API Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/transactions', transactionRoutes);
app.get('/', (req,res) => {
    res.send("Welcome to home page")
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
