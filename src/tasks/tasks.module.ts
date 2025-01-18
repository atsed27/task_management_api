import { MiddlewareConsumer, Module } from '@nestjs/common';
import { taskController } from './tasks.controller';
import { taskService } from './tasks.service';
import { UserMiddleware } from 'src/users/user.middleware';

@Module({
  controllers: [taskController],
  providers: [taskService],
})
export class taskModual {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(taskController);
  }
}
