import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { taskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateSubtaskDto } from './dto/create-subTask.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateSubTaskDto } from './dto/update-subTask.dto';

@ApiTags('Task')
@Controller('task')
export class taskController {
  constructor(private readonly taskService: taskService) {}

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  //get all sub task
  @Get('subtask')
  findAllSubTask() {
    return this.taskService.findAllSubTask();
  }
  //get one sub task
  @Get(':id')
  findOneSubtask(@Param('id') id: string) {
    return this.taskService.findOneSubtask(id);
  }
  @ApiHeader({
    name: 'user-id',
    description: 'ID of the user making the request',
    required: true,
  })
  @Post(':id')
  create(
    @Body() taskCreate: CreateTaskDto,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    const userId = req['user']?.id;
    return this.taskService.create(taskCreate, id, userId);
  }
  //create subtask
  @Post('subtask')
  createSubTask(@Body() subTaskCreate: CreateSubtaskDto) {
    return this.taskService.createSubTask(subTaskCreate);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateTask: UpdateTaskDto) {
    return this.taskService.updateTask(id, UpdateTask);
  }
  //update sub task
  @Patch('subtask:id')
  updateSubTask(
    @Param('id') id: string,
    @Body() UpdatesubTask: UpdateSubTaskDto,
  ) {
    return this.taskService.updateSubTask(id, UpdatesubTask);
  }
  @Delete(':id')
  Remove(@Param('id') id: string) {
    return this.taskService.removeTask(id);
  }
  @Delete('subtask:id')
  removeSubTask(@Param('id') id: string) {
    return this.taskService.removeSubTask(id);
  }
}
