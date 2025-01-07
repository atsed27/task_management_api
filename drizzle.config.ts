import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  schema: './src/**/*.schema.ts',
  schemaFilter: ['public'],
  dialect: 'postgresql',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
    ssl: process.env.SSL === 'true',
  },
});
