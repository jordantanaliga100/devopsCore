import type { Request } from 'express';
export declare class AuthService {
    static register(req: Request, credentials: {
        name: string;
        email: string;
        password: string;
    }): Promise<any>;
    static login(req: Request, credentials: {
        email: string;
        password: string;
    }): Promise<any>;
}
//# sourceMappingURL=auth.service.d.ts.map