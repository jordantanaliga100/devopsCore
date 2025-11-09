import { Cookie } from '../../utils/cookies.js';
import { formatValidationErro } from '../../utils/format.js';
import { signInSchema, signUpSchema } from '../../validations/auth.validations.js';
import { AuthService } from './auth.service.js';
// Register a new user
export const REGISTER_USER = async (req, res, next) => {
    try {
        const validationResult = signUpSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                error: 'Validation Failed',
                details: formatValidationErro(validationResult.error),
            });
        }
        // AUTH SERVICE HERE...
        const result = await AuthService.register(req, validationResult.data);
        res.status(200).json({ status: 'OK', message: 'User registererd', data: result });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error);
        }
    }
};
// User Login
export const LOGIN_USER = async (req, res, next) => {
    try {
        const validationResult = signInSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                error: 'Validation Failed',
                details: formatValidationErro(validationResult.error),
            });
        }
        const result = await AuthService.login(req, validationResult.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...authenticatedUser } = result;
        Cookie.set(res, 'session', { id: authenticatedUser.id, email: authenticatedUser.email });
        res.status(200).json({ status: 'OK', message: 'User login', data: authenticatedUser });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error);
        }
    }
};
// User Logout
export const LOGOUT_USER = async (req, res, next) => {
    try {
        // Clear the session cookie
        Cookie.clear(res, 'session');
        // Send response
        res.status(200).json({ status: 'OK', message: 'User logged out' });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error);
        }
    }
};
// Forgot Password
// export const FORGOT_PASSWORD = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     res.status(200).json({ status: 'OK', message: 'User registererd' })
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       next(error)
//     }
//   }
// }
//# sourceMappingURL=auth.controller.js.map