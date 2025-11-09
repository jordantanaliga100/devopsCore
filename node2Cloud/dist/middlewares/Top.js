import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
// import xss from 'xss-clean'
import { logger } from '../helpers/logger.js';
export const TopMiddlewares = [
    express.json(),
    express.urlencoded({ extended: true }),
    express.static('./public'),
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }),
    cookieParser(),
    helmet(),
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per window
        message: 'Too many requests, please try again later.',
    }),
    // xss(),
    morgan('combined', {
        stream: { write: message => logger.info(`(Acquisitions) ${message.trim()}`) },
    }),
];
//# sourceMappingURL=Top.js.map