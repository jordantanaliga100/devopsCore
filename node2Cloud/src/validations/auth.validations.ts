import * as z from 'zod'

export const signUpSchema = z.object({
  name: z.string().trim().max(255).trim(),
  email: z.string().trim().toLowerCase().max(255).trim(),
  password: z.string().min(6).max(128).trim(),
  role: z.enum(['user', 'admin']).default('user'),
})

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().max(255).trim(),
  password: z.string().min(1),
})
