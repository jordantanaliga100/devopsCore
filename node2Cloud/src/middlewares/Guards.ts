import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ErrorClass } from '../errors/index.js'

export async function AuthGuard(req: Request, res: Response, next: NextFunction) {
  try {
    // Read token from cookie (assuming cookie name is 'token')
    const token = req.cookies?.token

    if (!token) {
      throw new ErrorClass.Unauthorized('⚔️ No token provided in cookies')
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)

    // Attach decoded user data to request
    req.user = decoded as { id: number; role: string }

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

export function RoleGuard(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required',
          message: 'User not authenticated',
        })
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          error: 'Access denied',
          message: 'Insufficient permissions',
        })
      }

      next()
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          error: 'Internal server error',
          message: 'Error during role verification',
        })
      }
      next(error)
    }
  }
}
