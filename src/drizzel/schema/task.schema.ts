import { sql } from 'drizzle-orm';
import {
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const taskTypeEnum = pgEnum('task_type', [
  'Pending',
  'In Progress',
  'Completed',
]);
export const task = pgTable('task', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title'),
  description: text('description'),
  files: json('files'),
  user_id: uuid('user_id').references(() => user.id, {
    onDelete: 'set null',
  }),
  status: taskTypeEnum('task_type').$default(() => 'Pending'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const subTask = pgTable('subTask', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title'),
  description: text('description'),
  task_id: uuid('task_id').references(() => task.id, {
    onDelete: 'set null',
  }),
  status: taskTypeEnum('task_type').$default(() => 'Pending'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const file = pgTable('files', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  file_url: text('file_url'),
});

export const user = pgTable('usres', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  full_name: text('full_name'),
  user_name: text('user_name').unique(),
});
