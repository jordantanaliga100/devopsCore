import type { NextFunction, Request, Response } from 'express'
import { ErrorClass } from '../../errors/index.js'
import type { UpdateUserInput } from '../../types/user.types.js'
import { formatValidationErro } from '../../utils/format.js'
import { updateUserSchema, userIdSchema } from '../../validations/user.validation.js'
import { UserService } from './user.service.js'

export const GET_ALL = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await UserService.getAllUsers()
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

    console.log('PARSED ID', typeof userId)

    const validationResult = userIdSchema.safeParse({ id: userId })
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationErro(validationResult.error),
      })
    }

    const { id } = validationResult.data
    const user = await UserService.getUser(id)

    if (!user) {
      throw new ErrorClass.NotFound(`💁 User with id: ${userId} doesnt exist `)
    }

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

export const UPDATE = async (
  req: Request<
    { id: string },
    object,
    Partial<{
      name: string
      email: string
      role: 'user' | 'admin'
      password: string
    }>
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.params
    const updates = req.body // partial fields

    //validate id
    const idResult = userIdSchema.safeParse({ id: userId })
    if (!idResult.success) {
      return res.status(400).json({
        error: 'Invalid user ID',
        details: formatValidationErro(idResult.error),
      })
    }

    // validate body
    const bodyResult = updateUserSchema.safeParse(updates)
    if (!bodyResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationErro(bodyResult.error),
      })
    }

    const { id } = idResult.data
    const validUpdates = bodyResult.data

    // call service
    const updatedUser = await UserService.updateUser(id, validUpdates as UpdateUserInput)
    if (!updatedUser) {
      throw new ErrorClass.NotFound(`💁 User with id ${id} not found`)
    }

    return res.status(200).json({
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
      params: { id: userId },
    } = req
    console.log('PARSED ID', typeof userId)

    // Validate ID
    const validationResult = userIdSchema.safeParse({ id: userId })
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: formatValidationErro(validationResult.error),
      })
    }

    const { id } = validationResult.data

    // Call service
    const deleted = await UserService.deleteUser(id)

    if (!deleted) {
      throw new ErrorClass.NotFound(`💁 User with id: ${userId} doesnt exist `)
    }

    return res.status(200).json({
      message: 'User deleted successfully',
    })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
}

// const idValid = userIdSchema.safeParse({ id: req.params.id })

// // validate id
// if (!idValid.success) {
//   return res.status(200).json({
//     error: 'Validation failed',
//     details: formatValidationErro(idValid.error),
//   })
// }

// //validate body
// const bodyValid = updateUserSchema.safeParse(req.body)
// if (!bodyValid.success) {
//   return res.status(200).json({
//     error: 'Validation failed',
//     details: formatValidationErro(bodyValid.error),
//   })
// }

// const { id } = idValid.data
// const updates = bodyValid.data

// // checks auth
// if (req.user.role !== 'admin' && req.user.id !== id) {
//   return res.status(403).json({
//     error: 'Access denied',
//     message: 'You can only update your own information',
//   })
// }

// // Remove role from updates if non-admin user is trying to update their own profile
// if (req.user.role !== 'admin') {
//   delete updates.role
// }

// const updatedUser = await UserService.updateUser(id, updates)
// res.json({
//   message: 'User updated successfully',
//   user: updatedUser,
// })
