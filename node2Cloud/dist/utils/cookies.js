export class Cookie {
    static getDefaultOptions() {
        return {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000, // 15 minutes
        };
    }
    static set(res, name, value, options = {}) {
        res.cookie(name, value, { ...this.getDefaultOptions(), ...options });
    }
    static clear(res, name, options = {}) {
        res.clearCookie(name, { ...this.getDefaultOptions(), ...options });
    }
    static get(req, name) {
        return req.cookies?.[name];
    }
}
//# sourceMappingURL=cookies.js.map