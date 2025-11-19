import jwt from 'jsonwebtoken'
import { ErrorClass } from '../errors/index.js'

export interface JWTPayload {
  id?: string | number
  email?: string
  role?: string
  [key: string]: unknown
}

export class Jwt {
  private static readonly secret: string = process.env.JWT_SECRET || 'secret'
  private static readonly expiresIn: string | number = '1d'

  public static sign(payload: JWTPayload): string {
    try {
      return jwt.sign(payload, this.secret, {
        expiresIn: this.expiresIn as number | `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}`,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ErrorClass.BadRequest(`Failed to sign token: ${error.message}`)
      }
      throw new ErrorClass.BadRequest('Failed to sign token')
    }
  }

  public static verify<T = JWTPayload>(token: string): T {
    try {
      return jwt.verify(token, this.secret) as T
    } catch (error: unknown) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ErrorClass.Forbidden('Token expired')
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new ErrorClass.Forbidden('Invalid token')
      }
      if (error instanceof Error) {
        throw new ErrorClass.Forbidden(`Authentication failed: ${error.message}`)
      }
      throw new ErrorClass.Forbidden('Authentication failed')
    }
  }

  public static getExpiration(token: string): Date {
    try {
      const decoded = jwt.decode(token)

      if (!decoded || typeof decoded !== 'object') {
        throw new Error('Invalid token: unable to decode')
      }

      const expiration = decoded.exp

      if (typeof expiration !== 'number') {
        throw new Error('Invalid token: no expiration date')
      }

      return new Date(expiration * 1000)
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ErrorClass.BadRequest(`Failed to get expiration: ${error.message}`)
      }
      throw new ErrorClass.BadRequest('Failed to get token expiration')
    }
  }

  public static isValid(token: string): boolean {
    try {
      this.verify(token)
      return true
    } catch {
      return false
    }
  }
}
// import jwt from 'jsonwebtoken'
// import { ErrorClass } from '../errors/index.js'

// const JWT_SECRET = process.env.JWT_SECRET || 'secret'
// const JWT_EXPIRES_IN = '1d'

// export const jwtToken = {
//   sign: (payload: { id: string }) => {
//     try {
//       return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
//     } catch (error: unknown) {
//       if (error instanceof Error) throw new ErrorClass.BadRequest('Failed to authenticate token')
//     }
//   },

//   verify: (token: string) => {
//     try {
//       return jwt.verify(token, JWT_SECRET)
//     } catch (error: unknown) {
//       if (error instanceof Error) throw new ErrorClass.Forbidden('Failed to authenticate token')
//     }
//   },
// }
