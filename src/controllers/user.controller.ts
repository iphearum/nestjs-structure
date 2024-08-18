import { Body, Get, Param, Post } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { UserService } from '@services/user.service';
import { user } from '@common/constant.common';

export class UserController extends AppController {
  constructor() {
    super(new UserService());
  }
  @Post()
  async register(@Body() body: { username: string; password: string }) {
    await this.service.create({
      ...user,
      username: body.username,
      password: body.password,
      role_id: 0, // Replace with actual role_id from your user_role table
    });
    return { message: 'User created successfully' };
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.service.findUserByUsername(username);
    return user;
  }

  @Get()
  async getAllUsers() {
    return await this.service.getHello();
  }
}
