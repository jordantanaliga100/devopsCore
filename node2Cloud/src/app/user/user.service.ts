import { NeonDbError } from '@neondatabase/serverless'
import { DrizzleQueryError, eq } from 'drizzle-orm'
import { DB } from '../../config/db.js'
import { ErrorClass } from '../../errors/index.js'
import { userModel } from '../../models/user.model.js'
import type { User } from '../../types/user.type.js'

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    return DB.select({
      id: userModel.id,
      email: userModel.email,
      name: userModel.name,
      role: userModel.role,
      created_at: userModel.created_at,
      updated_at: userModel.updated_at,
    }).from(userModel)
  }

  static async getUser(id: number): Promise<User | null> {
    const [user]: User[] = await DB.select({
      id: userModel.id,
      email: userModel.email,
      name: userModel.name,
      role: userModel.role,
      created_at: userModel.created_at,
      updated_at: userModel.updated_at,
    })
      .from(userModel)
      .where(eq(userModel.id, id))
      .limit(1)

    return user!
  }

  static async deleteUser(id: number): Promise<boolean> {
    // First check if the user exists
    const [user] = await DB.select({ id: userModel.id }).from(userModel).where(eq(userModel.id, id))

    if (!user) return false

    try {
      // Attempt to delete
      await DB.delete(userModel).where(eq(userModel.id, id)).execute()

      return true
    } catch (err: unknown) {
      if (err instanceof DrizzleQueryError) {
        const cause = err.cause
        if (cause instanceof NeonDbError && cause.code === '23503') {
          // FK violation
          throw new ErrorClass.BadRequest('💁 Cannot delete user: user has linked accounts')
        }
      }
      throw err // rethrow other errors
    }
  }
}
