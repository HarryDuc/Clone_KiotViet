import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
    @Body('branch') branch: string,
    @Body('phone') phone: string,
  ) {
    return this.userService.register(name, email, password, role, branch, phone);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.login(email, password);
  }
}
