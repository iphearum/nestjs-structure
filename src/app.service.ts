import { Injectable, OnModuleInit } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { AnyTable } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './drizzle/schema';
import { Client } from "pg";

// or
const client = new Client({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

async function connectToDatabase() {
  await client.connect();
}

@Injectable()
export class AppService {
  protected db;
  // protected table;

  constructor(protected readonly table: any) {
    connectToDatabase();
    this.db = drizzle(client,{
      schema,
      logger: true,
    });
  }

  async create(object: any) {
    const data = await this.db.insert(this.table).values(object).returning();
    return data;
  }

  async findAll() {
    return this.db.select().from(this.table);
  }

  async findById(id: number) {
    return this.db.select().from(this.table).where({ id });
  }

  async update(id: number, object: any) {
    return this.db.update(this.table).set(object).where({ id }).returning();
  }

  async delete(id: number) {
    return this.db.deleteFrom(this.table).where({ id }).returning();
  }
}
