import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { authMiddleware } from './middleware/authMiddleware';
import profileRouter from './routes';
import logger from './logger';

const createError = require('http-errors');

dotenv.config();

const app = express();
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 50, // Limit each IP to 50 requests per `windowMs`
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again later.'
});

app.use(express.json());
// Rate Limiter
app.use(limiter);

// Logger
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

mongoose.connect(process.env.MONGO_URI || '');

app.use(authMiddleware);

app.use('/profile', profileRouter);

// Error
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(3001, () => console.log('Data Service running on port 3001'));