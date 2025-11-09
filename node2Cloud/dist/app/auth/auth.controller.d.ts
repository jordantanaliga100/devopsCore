import type { NextFunction, Request, Response } from 'express';
export declare const REGISTER_USER: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const LOGIN_USER: (req: Request, res: Response, next: NextFunction) => Promise<string | unknown>;
export declare const LOGOUT_USER: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map