import { logger } from "#config/logger.js"
import cors from 'cors'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import express from 'express'

export const TopMiddlewares: RequestHandler[] = [
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
  express.json(),
  express.urlencoded({ extended: true }),
  express.static('./public'),
  (req: Request, res: Response, next: NextFunction) => {
    logger.info("Hello from Acquisitions ! ")
  next()
  }
  
]