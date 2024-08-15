import { AppService } from "src/app.service";
import { users } from "src/drizzle/schema";

export class UserService extends AppService {
    constructor() {
        super(users);
    }
    async createUser(object: any){
        const data1 = await this.create(object)
        // or
        const data2 = await this.db.insert(this.table).values(object).returning();
    }

    getHello(): string {
        return "Hello World!";
    }
}