import { Module } from '@nestjs/common';
import { taskController } from './tasks.controller';
import { taskService } from './tasks.service';

@Module({
  controllers: [taskController],
  providers: [taskService],
})
export class taskModual {}
