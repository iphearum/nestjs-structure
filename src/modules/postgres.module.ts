import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@database/schema';
import { Client } from 'pg';

export const dbCredentials = {
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  user: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  ssl: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
}

export const client = new Client(dbCredentials);

export const db = drizzle(client, { schema });