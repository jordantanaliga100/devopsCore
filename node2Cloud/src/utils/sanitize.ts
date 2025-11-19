import type { User } from '../types/user.types.js'

export function sanitizeUser(user: User): Omit<User, 'password'> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = { ...user } // spread to plain object
  return rest
}
