import { Injectable, OnModuleInit } from '@nestjs/common';
import { db } from '@modules/postgres.module';

@Injectable()
export class AppService {
  protected db;
  // protected table;

  constructor(protected readonly table: any) {
    this.db = db;
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
