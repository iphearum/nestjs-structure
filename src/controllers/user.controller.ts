import { Get } from "@nestjs/common";
import { AppController } from "src/app.controller";
import { UserService } from "src/services/user.service";

export class UserController extends AppController {
    constructor() {
        super(new UserService());
    }

    @Get()
    async getAllUsers() {
        return await this.service.getHello();
    }
}