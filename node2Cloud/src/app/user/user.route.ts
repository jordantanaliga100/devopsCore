import express from 'express'
import { AuthGuard, RoleGuard } from '../../middlewares/Guards.js'
import { DELETE, GET, GET_ALL, UPDATE } from './user.controller.js'
const router = express.Router()

// MODE TWO
router.route('/').get(AuthGuard, GET_ALL)
router
  .route('/:id') // ← add the missing slash
  .get(AuthGuard, GET)
  .patch(AuthGuard, UPDATE)
  .delete(AuthGuard, RoleGuard(['admin']), DELETE)

// Export the router
const UserRoutes = router
export default UserRoutes
