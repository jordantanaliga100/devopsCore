import { NeonDbError } from '@neondatabase/serverless'
import { DrizzleQueryError, eq } from 'drizzle-orm'
import { DB } from '../../config/db.js'
import { ErrorClass } from '../../errors/index.js'
import { userModel } from '../../models/user.model.js'
import type { UpdateUserInput, User } from '../../types/user.types.js'

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

  static async updateUser(id: number, updates: UpdateUserInput): Promise<User | null> {
    const [existingUser] = await DB.select({
      id: userModel.id,
      name: userModel.name,
      email: userModel.email,
      role: userModel.role,
      created_at: userModel.created_at,
      updated_at: userModel.updated_at,
    })
      .from(userModel)
      .where(eq(userModel.id, id))

    if (!existingUser) return null

    // If no fields to update, return the existing user
    if (Object.keys(updates).length === 0) return existingUser

    try {
      // Apply updates
      const [updatedUser] = await DB.update(userModel)
        .set({
          ...updates,
          updated_at: new Date(), // auto-update timestamp
        })
        .where(eq(userModel.id, id))
        .returning({
          id: userModel.id,
          name: userModel.name,
          email: userModel.email,
          role: userModel.role,
          created_at: userModel.created_at,
          updated_at: userModel.updated_at,
        })

      return updatedUser!
    } catch (err: unknown) {
      // Handle unique constraint on email or other DB errors
      if (err instanceof Error) {
        if (err.message.includes('users_email_unique')) {
          throw new ErrorClass.BadRequest('💁 Email already exists')
        }
      }
      throw err // rethrow other errors
    }
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
