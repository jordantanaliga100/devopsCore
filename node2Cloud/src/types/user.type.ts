export interface User {
  id?: number
  email?: string
  name?: string
  role?: string
  password?: string
  created_at?: Date
  updated_at?: Date | null
  deleted_at?: Date
}

// interface AuthUser {
//   id: number
//   role: 'admin' | 'user'
// }

// interface UpdateUserInput {
//   name?: string
//   email?: string
//   role?: 'admin' | 'user'
// }

export type UpdateUserInput = Partial<{
  name?: string
  email?: string
  role?: 'user' | 'admin'
}>
