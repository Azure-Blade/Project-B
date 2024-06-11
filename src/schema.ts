import { InferSelectModel, relations } from 'drizzle-orm';
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/mysql-core';
import crypto from 'node:crypto';

export const blog = mysqlTable('blogs', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 64 }),
  content: text('content')
});

export type Blog = InferSelectModel<typeof blog>;

export const user = mysqlTable('user', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 320 }),
  username: varchar('username', { length: 64 }),
  password: varchar('password', { length: 255 }),
  verified: boolean('verified').$default(() => {
    return false;
  }),
  activationToken: varchar('activationToken', { length: 64 }).$default(() => {
    return crypto.randomBytes(32).toString('hex');
  })
});

export const userRelations = relations(user, ({ many }) => {
  return {
    session: many(session)
  };
});

export const session = mysqlTable('session', {
  id: int('id').primaryKey().autoincrement(),
  token: varchar('token', { length: 64 }),
  userId: int('userId')
    .references(() => user.id)
    .notNull(),
  timestamp: timestamp('timestamp', {
    mode: 'date',
    fsp: 6
  }).defaultNow()
});

export const sessionRelations = relations(session, ({ one }) => {
  return {
    user: one(user, {
      fields: [session.userId],
      references: [user.id]
    })
  };
});
