export interface JWTPayload {
    id?: string;
    email?: string;
    role?: string;
    [key: string]: unknown;
}
export declare class Jwt {
    private static readonly secret;
    private static readonly expiresIn;
    static sign(payload: JWTPayload): string;
    static verify<T = JWTPayload>(token: string): T;
    static getExpiration(token: string): Date;
    static isValid(token: string): boolean;
}
//# sourceMappingURL=jwt.d.ts.map