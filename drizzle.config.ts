import { dbCredentials } from '@modules/postgres.module';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema.ts',
  out: './src/database/migrate',
  dbCredentials: dbCredentials
});
