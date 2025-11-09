import type { NextFunction, Request, Response } from 'express';
import 'express';
declare module 'express' {
    interface Request {
        user?: unknown;
    }
}
export default function AuthGuards(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=AuthGuards.d.ts.map