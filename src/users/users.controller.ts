import { Body, Controller, Get, Post } from '@nestjs/common';
import { userService } from './users.service';
import { CreateUserDto } from './dto/create.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class userController {
  constructor(private readonly userService: userService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Post()
  create(@Body() userCreate: CreateUserDto) {
    return this.userService.create(userCreate);
  }
}
