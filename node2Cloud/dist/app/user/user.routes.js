import express from 'express'
const router = express.Router()
// MODE TWO
router
  .route('/')
  .get((req, res) => {
    res.send('All Users')
  })
  .post((req, res) => {
    res.send('Create User')
  })
router
  .route('/:id') // ← add the missing slash
  .get((req, res) => {
    res.send(`Get user ${req.params.id}`)
  })
  .patch((req, res) => {
    res.send(`Update user ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`Delete user ${req.params.id}`)
  })
// Export the router
const UserRoutes = router
export default UserRoutes
//# sourceMappingURL=user.routes.js.map
