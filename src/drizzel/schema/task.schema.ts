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
  status: taskTypeEnum('task_type').$default(() => 'Pending'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const file = pgTable('files', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  filename: text('filename'),
});
