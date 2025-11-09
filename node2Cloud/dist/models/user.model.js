import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timeStamps } from './helpers.js';
export const userModel = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    role: varchar('role', { length: 255 }).notNull().default('user'),
    ...timeStamps,
});
//# sourceMappingURL=user.model.js.map