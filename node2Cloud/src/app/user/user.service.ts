import { eq } from 'drizzle-orm'
import type { Request } from 'express'
import { DB } from '../../config/db.js'
import { userModel } from '../../models/user.model.js'
import type { User } from '../../types/user.type.js'

export class UserService {
  static async getAllUsers(req: Request): Promise<User[]> {
    const allUsers: User[] = await DB.select({
      id: userModel.id,
      email: userModel.email,
      name: userModel.name,
      role: userModel.role,
      created_at: userModel.created_at,
      updated_at: userModel.updated_at,
    }).from(userModel)

    return allUsers
  }

  static async getUser(req: Request, id: number | string): Promise<User | null> {
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

  static async updateUser(id: string, updates: any, req?: Request) {
    const DB = req.app.locals.db
  }
  static async deleteUser(req: Request) {
    const DB = req.app.locals.db
  }
}
