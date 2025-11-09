import type { NextFunction, Request, Response } from 'express'
import { formatValidationErro } from '../../utils/format.js'
import { updateUserSchema, userIdSchema } from '../../validations/user.validation.js'
import { UserService } from './user.service.js'

export const GET_ALL = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await UserService.getAllUsers(req)
    res.status(200).json({
      message: '💁 ALL USERS',
      count: allUsers.length,
      allUsers,
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}

export const GET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { id: userId },
    } = req

    const validationResult = userIdSchema.safeParse({ id: userId })
    if (!validationResult.success) {
      return res.status(200).json({
        error: 'Validation failed',
        details: formatValidationErro(validationResult.error),
      })
    }

    const { id } = validationResult.data
    const user = await UserService.getUser(req, id)

    res.json({
      message: 'User retrieved successfully',
      user,
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}

export const UPDATE = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const idValid = userIdSchema.safeParse({ id: req.params.id })

    // validate id
    if (!idValid.success) {
      return res.status(200).json({
        error: 'Validation failed',
        details: formatValidationErro(idValid.error),
      })
    }

    //validate body
    const bodyValid = updateUserSchema.safeParse(req.body)
    if (!bodyValid.success) {
      return res.status(200).json({
        error: 'Validation failed',
        details: formatValidationErro(bodyValid.error),
      })
    }

    const { id } = idValid.data
    const updates = bodyValid.data

    // checks auth
    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'You can only update your own information',
      })
    }

    // Remove role from updates if non-admin user is trying to update their own profile
    if (req.user.role !== 'admin') {
      delete updates.role
    }

    const updatedUser = await UserService.updateUser(id, updates)
    res.json({
      message: 'User updated successfully',
      user: updatedUser,
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}

export const DELETE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params,
      body: {},
    } = req
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}

interface AuthUser {
  id: number
  role: 'admin' | 'user'
}

interface UpdateUserInput {
  name?: string
  email?: string
  role?: 'admin' | 'user'
}
interface AuthRequest<B = unknown> extends Request {
  user: AuthUser
  body: B
  params: { id: string }
}
