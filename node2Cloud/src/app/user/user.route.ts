import express from 'express'
import { DELETE, GET, GET_ALL, UPDATE } from './user.controller.js'
const router = express.Router()

// MODE TWO
router.route('/').get(GET_ALL)
router
  .route('/:id') // ← add the missing slash
  .get(GET)
  .patch(UPDATE)
  .delete(DELETE)

// Export the router
const UserRoutes = router
export default UserRoutes
