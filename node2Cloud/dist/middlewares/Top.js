import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { logger } from '../helpers/logger.js'
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
  morgan('combined', {
    stream: { write: message => logger.info(`(Acquisitions) ${message.trim()}`) },
  }),
  // (req: Request, res: Response, next: NextFunction) => {
  //   logger.info('Hello from Acquisitions ! ')
  //   next()
  // },
]
//# sourceMappingURL=Top.js.map
