import AuthRoutes from '../app/auth/auth.routes.js'
import UserRoutes from '../app/user/user.routes.js'

// Define your route resources here
export const RouteModules = {
  auth: AuthRoutes,
  users: UserRoutes,
}
