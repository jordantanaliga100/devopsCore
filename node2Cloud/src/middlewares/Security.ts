import cookieParser from 'cookie-parser'
import cors from 'cors'
import type { RequestHandler } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

export const SecurityMiddlewares: RequestHandler[] = [
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
]

// cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PATCH', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }),
// cookieParser(),
// helmet(),
// rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per window
//   message: 'Too many requests, please try again later.',
// }),
