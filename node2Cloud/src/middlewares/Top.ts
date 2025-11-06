import cookieParser from 'cookie-parser'
import cors from 'cors'
import type { RequestHandler } from 'express'
import express from 'express'
import helmet from 'helmet'

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
  // morgan('combined', {
  //   stream: { write: message => logger.info(`(Acquisitions) ${message.trim()}`) },
  // }),
  // (req: Request, res: Response, next: NextFunction) => {
  //   logger.info('Hello from Acquisitions ! ')
  //   next()
  // },
]
