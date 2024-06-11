import { env } from '@/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema.ts',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB_DATABASE,
    password: env.DB_PASSWORD
  }
});
