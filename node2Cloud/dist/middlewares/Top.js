import cors from 'cors';
import express from 'express';
import { logger } from "../helpers/logger.js";
export const TopMiddlewares = [
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }),
    express.json(),
    express.urlencoded({ extended: true }),
    express.static('./public'),
    (req, res, next) => {
        logger.info("Hello from Acquisitions ! ");
        next();
    }
];
//# sourceMappingURL=Top.js.map