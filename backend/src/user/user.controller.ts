import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

// user.controller has the routes, but the logic is separated to user.service
// strictly following mvc
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
