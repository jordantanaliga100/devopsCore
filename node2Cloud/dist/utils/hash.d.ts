export declare class Hash {
    private static saltRounds;
    static create(plainText: string): Promise<string>;
    static compare(password: string, hashPass: string): Promise<boolean>;
    static isHashed(value: string): boolean;
}
//# sourceMappingURL=hash.d.ts.map