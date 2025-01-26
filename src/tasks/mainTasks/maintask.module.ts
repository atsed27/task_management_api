import { Module } from '@nestjs/common';
import { mainTaskController } from './maintask.controller';
import { mainTaskService } from './maintask.service';

@Module({
  controllers: [mainTaskController],
  providers: [mainTaskService],
})
export class mainTaskModual {}
