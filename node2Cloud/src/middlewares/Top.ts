import type { RequestHandler } from 'express'
import express from 'express'
import morgan from 'morgan'
// import xss from 'xss-clean'
import { logger } from '../helpers/logger.js'

export const TopMiddlewares: RequestHandler[] = [
  express.json(),
  express.urlencoded({ extended: true }),
  express.static('./public'),

  // xss(),
  morgan('combined', {
    stream: { write: message => logger.info(`(Acquisitions) ${message.trim()}`) },
  }),
]
