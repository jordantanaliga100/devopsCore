import { eq } from 'drizzle-orm'
import type { Request } from 'express'
import { ErrorClass } from '../../errors/index.js'
import { userModel } from '../../models/user.model.js'
import { Hash } from '../../utils/hash.js'

export class AuthService {
  static async register(
    req: Request,
    credentials: { name: string; email: string; password: string }
  ) {
    const DB = req.app.locals.db

    const existingUser = await DB.select()
      .from(userModel)
      .where(eq(userModel.email, credentials.email))
      .limit()

    console.log('eisiting user', existingUser)

    if (existingUser.length > 0) {
      throw new ErrorClass.BadRequest(`💁 User already exists: ${existingUser[0].email}`)
    }
    // // HASHED PASSWORD HERE
    const hashedPassword = await Hash.create(credentials.password)

    // CREATE NEW USER
    const createdUser = await DB.insert(userModel)
      .values({ ...credentials, password: hashedPassword })
      .returning({
        id: userModel.id,
        name: userModel.name,
        email: userModel.email,
        role: userModel.role,
        createdAt: userModel.createdAt,
      })

    return createdUser
  }
  static async login(req: Request, credentials: { email: string; password: string }) {
    const DB = req.app.locals.db
    const existingUser = await DB.select()
      .from(userModel)
      .where(eq(userModel.email, credentials.email))
      .limit(1)

    if (existingUser.length === 0) {
      throw new ErrorClass.BadRequest(`💁 User with email: ${credentials.email} doesnt exist`)
    }

    const user = existingUser[0]
    // comare pasword
    const isMatch = await Hash.compare(credentials.password, user.password)

    if (!isMatch) {
      throw new ErrorClass.BadRequest('Invalid email or password')
    }
    return user
  }
  // static async logout(userId: string) {}
  // static async refreshToken(token: string) {}
}
