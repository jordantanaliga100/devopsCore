import type { Request, Response } from 'express'

interface CookieOptions {
  httpOnly?: boolean
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  maxAge?: number
  domain?: string
  path?: string
}

export class Cookie {
  private static getDefaultOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    }
  }

  static set(res: Response, name: string, value: string, options: CookieOptions = {}): void {
    res.cookie(name, value, { ...this.getDefaultOptions(), ...options })
  }

  static clear(res: Response, name: string, options: CookieOptions = {}): void {
    res.clearCookie(name, { ...this.getDefaultOptions(), ...options })
  }

  static get(req: Request, name: string): string | undefined {
    return req.cookies?.[name]
  }
}
