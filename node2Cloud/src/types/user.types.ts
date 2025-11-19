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

export type UpdateUserInput = Partial<{
  name: string
  email: string
  role: 'user' | 'admin'
}>

export interface AuthRequest extends Request {
  user: {
    id: number
    role: string
  }
}
