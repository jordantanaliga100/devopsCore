import { integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { timeStamps } from './helpers.js';
import { userModel } from './user.model.js';
export const ProviderEnum = pgEnum('provider_enum', ['email', 'google', 'github']);
export const accountModel = pgTable('accounts', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
        .references(() => userModel.id)
        .notNull(), // FK to users
    provider: ProviderEnum('provider').notNull().default('email'),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    ...timeStamps,
});
//# sourceMappingURL=account.model.js.map