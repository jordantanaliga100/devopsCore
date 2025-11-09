import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { timeStamps } from './helpers.js';
import { userModel } from './user.model.js';
export const postModel = pgTable('posts', {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
        .references(() => userModel.id)
        .notNull(), // FK to users
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    ...timeStamps,
});
//# sourceMappingURL=post.model.js.map