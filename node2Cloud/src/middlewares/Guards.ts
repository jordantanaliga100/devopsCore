import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ErrorClass } from '../errors/index.js'

// Extend Request type para may req.user
import 'express'

declare module 'express' {
  interface Request {
    user?: unknown
  }
}

export default async function AuthGuards(req: Request, res: Response, next: NextFunction) {
  try {
    // Read token from cookie (assuming cookie name is 'token')
    const token = req.cookies?.token

    if (!token) {
      throw new ErrorClass.Unauthorized('⚔️ No token provided in cookies')
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    // Attach decoded user data to request
    req.user = decoded

    next()
  } catch (err: unknown) {
    if (err instanceof jwt.TokenExpiredError) {
      return next(new ErrorClass.Unauthorized('⚔️ Token expired'))
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new ErrorClass.Unauthorized('⚔️ Invalid token'))
    }
    // fallback for other errors
    next(err)
  }
}
