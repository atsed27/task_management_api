import { Module } from '@nestjs/common';
import { userService } from './users.service';
import { userController } from './users.controller';

@Module({
  controllers: [userController],
  providers: [userService],
})
export class userModule {}
