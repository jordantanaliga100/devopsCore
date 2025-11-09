import bcrypt from 'bcrypt';
export class Hash {
    static saltRounds = 10;
    static async create(plainText) {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            return await bcrypt.hash(plainText, salt);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create hash: ${error.message}`);
            }
            throw new Error('Failed to create hash');
        }
    }
    static async compare(password, hashPass) {
        try {
            const isMatch = await bcrypt.compare(password, hashPass);
            return isMatch;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to compare hash: ${error.message}`);
            }
            throw new Error('Failed to compare hash');
        }
    }
    static isHashed(value) {
        return value.startsWith('$2b$') || value.startsWith('$2a$') || value.startsWith('$2y$');
    }
}
//# sourceMappingURL=hash.js.map