import cookieParser from 'cookie-parser'
import cors from 'cors'
import type { RequestHandler } from 'express'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import xss from 'xss-clean'

export const TopMiddlewares: RequestHandler[] = [
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
  xss(),
  // morgan('combined', {
  //   stream: { write: message => logger.info(`(Acquisitions) ${message.trim()}`) },
  // }),
  // (req: Request, res: Response, next: NextFunction) => {
  //   logger.info('Hello from Acquisitions ! ')
  //   next()
  // },
]
