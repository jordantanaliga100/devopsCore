import type { Request, Response } from 'express';
interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    maxAge?: number;
    domain?: string;
    path?: string;
}
export declare class Cookie {
    private static getDefaultOptions;
    static set(res: Response, name: string, value: unknown, options?: CookieOptions): void;
    static clear(res: Response, name: string, options?: CookieOptions): void;
    static get(req: Request, name: string): string | undefined;
}
export {};
//# sourceMappingURL=cookies.d.ts.map