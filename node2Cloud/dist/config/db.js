import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
export async function initDb() {
    try {
        const dbUrl = process.env.DATABASE_URL;
        if (!dbUrl)
            throw new Error('❌ Missing DATABASE_URL in environment variables');
        const sql = neon(dbUrl);
        let db;
        try {
            db = drizzle({ client: sql });
        }
        catch (innerErr) {
            console.error('🔥 Drizzle initialization failed:', innerErr);
            process.exit(1);
        }
        console.log('✅ Database connection initialized successfully');
        return db;
    }
    catch (err) {
        console.error('🔥 Failed to connect to database:', err);
        process.exit(1);
    }
}
//# sourceMappingURL=db.js.map