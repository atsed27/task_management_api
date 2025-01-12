import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'Title of the task',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Description of the task',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Status of the task',
    required: false,
    example: 'Pending',
  })
  status?: string;
}
