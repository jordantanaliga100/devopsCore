import jwt from 'jsonwebtoken';
import { ErrorClass } from '../errors/index.js';
export class Jwt {
    static secret = process.env.JWT_SECRET || 'secret';
    static expiresIn = '1d';
    static sign(payload) {
        try {
            return jwt.sign(payload, this.secret, {
                expiresIn: this.expiresIn,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                throw new ErrorClass.BadRequest(`Failed to sign token: ${error.message}`);
            }
            throw new ErrorClass.BadRequest('Failed to sign token');
        }
    }
    static verify(token) {
        try {
            return jwt.verify(token, this.secret);
        }
        catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new ErrorClass.Forbidden('Token expired');
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new ErrorClass.Forbidden('Invalid token');
            }
            if (error instanceof Error) {
                throw new ErrorClass.Forbidden(`Authentication failed: ${error.message}`);
            }
            throw new ErrorClass.Forbidden('Authentication failed');
        }
    }
    static getExpiration(token) {
        try {
            const decoded = jwt.decode(token);
            if (!decoded || typeof decoded !== 'object') {
                throw new Error('Invalid token: unable to decode');
            }
            const expiration = decoded.exp;
            if (typeof expiration !== 'number') {
                throw new Error('Invalid token: no expiration date');
            }
            return new Date(expiration * 1000);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new ErrorClass.BadRequest(`Failed to get expiration: ${error.message}`);
            }
            throw new ErrorClass.BadRequest('Failed to get token expiration');
        }
    }
    static isValid(token) {
        try {
            this.verify(token);
            return true;
        }
        catch {
            return false;
        }
    }
}
// import jwt from 'jsonwebtoken'
// import { ErrorClass } from '../errors/index.js'
// const JWT_SECRET = process.env.JWT_SECRET || 'secret'
// const JWT_EXPIRES_IN = '1d'
// export const jwtToken = {
//   sign: (payload: { id: string }) => {
//     try {
//       return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
//     } catch (error: unknown) {
//       if (error instanceof Error) throw new ErrorClass.BadRequest('Failed to authenticate token')
//     }
//   },
//   verify: (token: string) => {
//     try {
//       return jwt.verify(token, JWT_SECRET)
//     } catch (error: unknown) {
//       if (error instanceof Error) throw new ErrorClass.Forbidden('Failed to authenticate token')
//     }
//   },
// }
//# sourceMappingURL=jwt.js.map