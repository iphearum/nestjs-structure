import { eq } from 'drizzle-orm';
import { AppService } from 'src/app.service';
import { users } from '@database/schema';

export class UserService extends AppService {
  constructor() {
    super(users);
  }
  async createUser(object: any) {
    const data1 = await this.create(object);
    // or
    const data2 = await this.db.insert(this.table).values(object).returning();
  }

  async findUserByUsername(username: string) {
    return await this.db
      .select()
      .from(users)
      .where(eq(users.username, username));
  }

  getHello(): string {
    return 'Hello World!';
  }
}
