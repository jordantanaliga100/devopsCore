import express from 'express'
const router = express.Router()

// MODE TWO
router
  .route('/')
  .get((req, res) => {
    res.send('On Auth ')
  })
  .post((req, res) => {
    console.log(req.body)

    res.send('On Auth ')
  })

router
  .route(':id')
  .get(() => {
    // Handle GET request for resource with ID
  })
  .patch(() => {
    // Handle PATCH request for resource with ID
  })
  .delete(() => {
    // Handle DELETE request for resource with ID
  })

// Export the router
const AuthRoutes = router
export default AuthRoutes
