import { timestamp } from 'drizzle-orm/pg-core';
export const timeStamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
};
//# sourceMappingURL=helpers.js.map