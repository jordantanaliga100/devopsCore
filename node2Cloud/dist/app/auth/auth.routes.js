import express from 'express';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './auth.controller.js';
const router = express.Router();
// MODE TWO
router.route('/sign-up').post(REGISTER_USER);
router.route('/sign-in').post(LOGIN_USER);
router.route('/sign-out').get(LOGOUT_USER);
// Export the router
const AuthRoutes = router;
export default AuthRoutes;
//# sourceMappingURL=auth.routes.js.map